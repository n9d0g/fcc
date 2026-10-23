import {
	prayerMeetingSchema,
	upcomingWednesdays,
	type PrayerMeeting,
} from '#lib/schemas/prayer.js'
import { torontoToday } from '#lib/schemas/worship-availability.js'
import { notifyPrayerAssignment } from '#lib/server/prayer-reminders.js'
import { error, fail, type RequestEvent } from '@sveltejs/kit'
import { z } from 'zod'
import type { Actions, PageServerLoad } from './$types'

type SiteUser = { id: string; email: string; display_name: string | null }

const listUsers = async ({ locals }: RequestEvent) => {
	const { data, error: err } = await locals.supabase.rpc('admin_list_users')
	if (err) throw err
	return (data ?? []) as SiteUser[]
}

export const load: PageServerLoad = async (event) => {
	// Upcoming meetings plus the last four weeks, for context
	const since = new Date(
		Date.parse(`${torontoToday()}T00:00:00Z`) - 28 * 86_400_000
	)
		.toISOString()
		.slice(0, 10)

	const [meetings, users] = await Promise.all([
		event.locals.supabase
			.from('prayer_meetings')
			.select('id, meeting_date, leader_name, leader_user_id, scripture')
			.gte('meeting_date', since)
			.order('meeting_date')
			.returns<PrayerMeeting[]>(),
		listUsers(event).catch((e) => {
			console.error('[admin] list users', e)
			return [] as SiteUser[]
		}),
	])

	if (meetings.error) {
		console.error('[admin] load prayer meetings', meetings.error)
		throw error(500, 'Could not load the prayer schedule')
	}

	return { meetings: meetings.data, users, today: torontoToday() }
}

export const actions = {
	save: async (event) => {
		const formData = await event.request.formData()
		const id = String(formData.get('id') ?? '')
		const parsed = prayerMeetingSchema.safeParse({
			meetingDate: String(formData.get('meetingDate') ?? ''),
			leaderName: String(formData.get('leaderName') ?? ''),
			leaderUserId: String(formData.get('leaderUserId') ?? ''),
			scripture: String(formData.get('scripture') ?? ''),
		})
		if (!parsed.success) {
			const { fieldErrors } = z.flattenError(parsed.error)
			const message =
				Object.values(fieldErrors).flat()[0] ?? 'Please check the form.'
			return fail(400, { id, message })
		}
		const { meetingDate, leaderUserId, scripture } = parsed.data
		let { leaderName } = parsed.data

		// Linking an account with no name typed in uses that account's name
		if (leaderUserId && !leaderName) {
			const user = (await listUsers(event)).find((u) => u.id === leaderUserId)
			leaderName = user?.display_name || user?.email.split('@')[0] || ''
		}

		// What the meeting looked like before, to tell whether the leader changed
		const before = id
			? (
					await event.locals.supabase
						.from('prayer_meetings')
						.select('meeting_date, leader_user_id')
						.eq('id', id)
						.maybeSingle<
							Pick<PrayerMeeting, 'meeting_date' | 'leader_user_id'>
						>()
				).data
			: null

		const row = {
			meeting_date: meetingDate,
			leader_name: leaderName || null,
			leader_user_id: leaderUserId || null,
			scripture: scripture || null,
		}
		const { error: err } = id
			? await event.locals.supabase
					.from('prayer_meetings')
					.update(row)
					.eq('id', id)
			: await event.locals.supabase.from('prayer_meetings').insert(row)

		if (err) {
			if (err.code === '23505') {
				return fail(409, {
					id,
					message: 'There is already a meeting on that date.',
				})
			}
			console.error('[admin] save prayer meeting', err)
			return fail(500, { id, message: 'Could not save the meeting.' })
		}

		// Email a linked leader when they're newly assigned, or when their
		// meeting moves to another date. Other edits (scripture, name) don't
		// send anything, and neither do meetings already in the past.
		const sameLeader = before?.leader_user_id === leaderUserId
		const moved = sameLeader && before?.meeting_date !== meetingDate
		let notified = false
		if (
			leaderUserId &&
			meetingDate >= torontoToday() &&
			(!sameLeader || moved)
		) {
			notified = await notifyPrayerAssignment({
				leaderUserId,
				leaderName: leaderName || null,
				meetingDate,
				scripture: scripture || null,
				previousDate: moved ? before?.meeting_date : undefined,
			})
		}

		return { id, saved: true as const, notified, leaderName }
	},

	delete: async (event) => {
		const id = String((await event.request.formData()).get('id') ?? '')
		const { error: err } = await event.locals.supabase
			.from('prayer_meetings')
			.delete()
			.eq('id', id)
		if (err) {
			console.error('[admin] delete prayer meeting', err)
			return fail(500, { id, message: 'Could not delete the meeting.' })
		}
		return { id, deleted: true as const }
	},

	// Adds the next 8 Wednesdays (leader TBA), skipping dates already scheduled
	addWeeks: async (event) => {
		const rows = upcomingWednesdays(torontoToday(), 8).map((meeting_date) => ({
			meeting_date,
		}))
		const { data, error: err } = await event.locals.supabase
			.from('prayer_meetings')
			.upsert(rows, { onConflict: 'meeting_date', ignoreDuplicates: true })
			.select('id')
		if (err) {
			console.error('[admin] add prayer weeks', err)
			return fail(500, { message: 'Could not add meetings.' })
		}
		return { added: data?.length ?? 0 }
	},
} satisfies Actions
