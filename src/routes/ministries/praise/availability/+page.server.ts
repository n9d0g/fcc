import { getResend, getResendFromEmail } from '#lib/resend.server.js'
import { renderEmail } from '#lib/emails/render.server.js'
import WorshipAvailabilityEmail from '#lib/emails/WorshipAvailability.svelte'
import {
	formatSunday,
	torontoToday,
	upcomingSundays,
} from '#lib/schemas/worship-availability.js'
import type { WorshipRequest } from '#lib/schemas/worship-team.js'
import { requireWorshipMember } from '#lib/server/roles.js'
import { fail, type RequestEvent } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

// Only approved team members can block out Sundays
const loadMember = async ({ locals }: RequestEvent) => {
	const { user } = await locals.safeGetSession()
	if (!user) return { user: null, request: null }

	const { data: request, error } = await locals.supabase
		.from('worship_team_requests')
		.select('*')
		.eq('user_id', user.id)
		.maybeSingle<WorshipRequest>()

	if (error) console.error('[availability] load request', error)

	return { user, request }
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

// Worship team only: signed-out visitors are sent to log in and everyone else
// gets a 404. Leaders who aren't on the team themselves see "notMember".
export const load: PageServerLoad = async (event) => {
	await requireWorshipMember(event)
	const { user, request } = await loadMember(event)
	const sundays = upcomingSundays(torontoToday())
	const blocked: string[] = []

	if (!user || request?.status !== 'approved') {
		return { state: 'notMember' as const, sundays, blocked }
	}

	try {
		const blocked = await blockedSundays(event, user.id, sundays[0])
		return { state: 'member' as const, sundays, blocked }
	} catch (e) {
		console.error('[availability] load dates', e)
		return { state: 'member' as const, sundays, blocked, loadError: true }
	}
}

// Best effort: the dates are saved and shown on the admin page either way,
// so a failed notification is logged rather than shown to the member.
// Goes to superusers and worship leaders.
async function notifyAdmins(
	event: RequestEvent,
	request: WorshipRequest,
	added: string[],
	removed: string[]
) {
	try {
		const { data, error: rpcError } = await event.locals.supabase.rpc(
			'worship_leader_emails'
		)
		if (rpcError) throw rpcError
		const admins = data as string[] | null
		if (!admins?.length) {
			console.warn('[availability] no worship leaders to notify')
			return
		}

		const { html, text } = await renderEmail(WorshipAvailabilityEmail, {
			fullName: request.full_name,
			email: request.email,
			unavailable: added.map(formatSunday),
			available: removed.map(formatSunday),
			reviewUrl: `${event.url.origin}/admin/availability`,
			updatedAt: new Date().toLocaleString('en-CA', {
				timeZone: 'America/Toronto',
				dateStyle: 'medium',
				timeStyle: 'short',
			}),
		})
		const { error } = await getResend().emails.send({
			from: `Freedom in Christ Church <${getResendFromEmail()}>`,
			to: admins,
			replyTo: request.email,
			subject: `Availability update: ${request.full_name}`,
			html,
			text,
		})
		if (error) console.error('[availability] resend error', error)
	} catch (e) {
		console.error('[availability] notify', e)
	}
}

export const actions = {
	default: async (event) => {
		const { user, request } = await loadMember(event)
		if (!user)
			return fail(401, {
				message: 'Please log in to update your availability.',
			})
		if (request?.status !== 'approved') {
			return fail(403, {
				message: 'Only worship team members can block out Sundays.',
			})
		}

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

		await notifyAdmins(event, request, added, removed)

		return { added, removed }
	},
} satisfies Actions
