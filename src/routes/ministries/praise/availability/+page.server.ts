import WorshipAvailabilityEmail from '#lib/emails/WorshipAvailability.svelte'
import {
	formatSunday,
	torontoTimestamp,
	torontoToday,
	upcomingSundays,
} from '#lib/schemas/worship-availability.js'
import { displayNameOf } from '#lib/schemas/account.js'
import type { WorshipRequest } from '#lib/schemas/worship-team.js'
import { signedInUser } from '#lib/server/access.js'
import { trySend } from '#lib/server/notifier.js'
import { fail, type RequestEvent } from '@sveltejs/kit'
import type { User } from '@supabase/supabase-js'
import type { Actions, PageServerLoad } from './$types'

type Member = { fullName: string; email: string }

// How the notification names the member: their team request, or for worship
// leaders who never filed one, their account
const memberContact = async (
	{ locals }: RequestEvent,
	user: User
): Promise<Member> => {
	const { data: request, error } = await locals.supabase
		.from('worship_team_requests')
		.select('full_name, email')
		.eq('user_id', user.id)
		.maybeSingle<Pick<WorshipRequest, 'full_name' | 'email'>>()

	if (error) console.error('[availability] load request', error)

	const email = request?.email ?? user.email ?? ''
	return {
		fullName: request?.full_name || displayNameOf(user) || email.split('@')[0],
		email,
	}
}

const blockedSundays = async (
	{ locals }: RequestEvent,
	userId: string,
	from: string
) => {
	const { data, error } = await locals.supabase
		.from('worship_unavailability')
		.select('sunday')
		.eq('user_id', userId)
		.gte('sunday', from)
		.returns<{ sunday: string }[]>()

	if (error) throw error
	return data.map((r) => r.sunday)
}

// Worship members only (gated in #lib/server/access.ts)
export const load: PageServerLoad = async (event) => {
	const user = await signedInUser(event.locals)
	const sundays = upcomingSundays(torontoToday())

	try {
		const blocked = await blockedSundays(event, user.id, sundays[0])
		return { sundays, blocked }
	} catch (e) {
		console.error('[availability] load dates', e)
		return { sundays, blocked: [] as string[], loadError: true }
	}
}

// Best effort: the dates are saved and shown on the admin page either way,
// so a failed notification is logged rather than shown to the member.
// Goes to superusers and worship leaders.
const notifyAdmins = (
	event: RequestEvent,
	member: Member,
	added: string[],
	removed: string[]
) =>
	trySend({
		to: 'worshipLeaders',
		replyTo: member.email,
		subject: `Availability update: ${member.fullName}`,
		template: WorshipAvailabilityEmail,
		props: {
			fullName: member.fullName,
			email: member.email,
			unavailable: added.map(formatSunday),
			available: removed.map(formatSunday),
			reviewUrl: `${event.url.origin}/admin/availability`,
			updatedAt: torontoTimestamp(),
		},
	})

export const actions = {
	default: async (event) => {
		const user = await signedInUser(event.locals)
		const sundays = upcomingSundays(torontoToday())
		const allowed = new Set(sundays)
		const selected = new Set(
			(await event.request.formData())
				.getAll('sundays')
				.map(String)
				.filter((d) => allowed.has(d))
		)

		let current: string[]
		try {
			current = await blockedSundays(event, user.id, sundays[0])
		} catch (e) {
			console.error('[availability] load dates', e)
			return fail(500, {
				message: "We couldn't save your availability. Please try again.",
			})
		}
		const currentSet = new Set(current)
		const added = sundays.filter((d) => selected.has(d) && !currentSet.has(d))
		const removed = sundays.filter((d) => currentSet.has(d) && !selected.has(d))

		if (!added.length && !removed.length) return { added, removed }

		const { supabase } = event.locals
		const [insert, remove] = await Promise.all([
			added.length
				? supabase
						.from('worship_unavailability')
						.insert(added.map((sunday) => ({ user_id: user.id, sunday })))
				: null,
			removed.length
				? supabase
						.from('worship_unavailability')
						.delete()
						.eq('user_id', user.id)
						.in('sunday', removed)
				: null,
		])

		const err = insert?.error ?? remove?.error
		if (err) {
			console.error('[availability] save', err)
			return fail(500, {
				message: "We couldn't save your availability. Please try again.",
			})
		}

		await notifyAdmins(event, await memberContact(event, user), added, removed)

		return { added, removed }
	},
} satisfies Actions
