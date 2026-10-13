import { getResend, getResendFromEmail } from '#lib/resend.server.js'
import { renderEmail } from '#lib/emails/render.server.js'
import WorshipTeamRequestEmail from '#lib/emails/WorshipTeamRequest.svelte'
import {
	roleLabel,
	worshipRequestSchema,
	type WorshipRequest,
} from '#lib/schemas/worship-team.js'
import { fail } from '@sveltejs/kit'
import { z } from 'zod'
import type { Actions, PageServerLoad } from './$types'

const REQUEST_INBOX = 'nate@njil.dev'

type Values = { fullName: string; roles: string[]; message: string }
type FieldErrors = Partial<Record<keyof Values, string>>

const failure = (
	status: number,
	values: Values,
	errors: FieldErrors = {},
	message?: string
) => fail(status, { values, errors, message })

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.safeGetSession()
	if (!user) return { signedIn: false as const, request: null, displayName: '' }

	const { data: request, error } = await locals.supabase
		.from('worship_team_requests')
		.select('*')
		.eq('user_id', user.id)
		.maybeSingle<WorshipRequest>()

	if (error) console.error('[worship-team] load request', error)

	const displayName =
		typeof user.user_metadata?.display_name === 'string'
			? user.user_metadata.display_name
			: ''

	return { signedIn: true as const, request, displayName }
}

// Best effort: the request is already saved and listed on the admin page,
// so a failed notification is logged rather than shown to the requester.
async function notifyAdmins(
	values: z.infer<typeof worshipRequestSchema>,
	email: string,
	reviewUrl: string
) {
	try {
		const { html, text } = await renderEmail(WorshipTeamRequestEmail, {
			fullName: values.fullName,
			email,
			roles: values.roles.map(roleLabel),
			message: values.message,
			reviewUrl,
			submittedAt: new Date().toLocaleString('en-CA', {
				timeZone: 'America/Toronto',
				dateStyle: 'medium',
				timeStyle: 'short',
			}),
		})
		const { error } = await getResend().emails.send({
			from: `Freedom in Christ Church <${getResendFromEmail()}>`,
			to: REQUEST_INBOX,
			replyTo: email,
			subject: `Worship team request: ${values.fullName}`,
			html,
			text,
		})
		if (error) console.error('[worship-team] resend error', error)
	} catch (e) {
		console.error('[worship-team] notify', e)
	}
}

export const actions = {
	default: async ({ request, locals, url }) => {
		const formData = await request.formData()
		const values: Values = {
			fullName: String(formData.get('fullName') ?? ''),
			roles: formData.getAll('roles').map(String),
			message: String(formData.get('message') ?? ''),
		}

		const { user } = await locals.safeGetSession()
		if (!user?.email) {
			return failure(401, values, {}, 'Please log in to send a request.')
		}

		const parsed = worshipRequestSchema.safeParse(values)
		if (!parsed.success) {
			const { fieldErrors } = z.flattenError(parsed.error)
			return failure(400, values, {
				fullName: fieldErrors.fullName?.[0],
				roles: fieldErrors.roles?.[0],
				message: fieldErrors.message?.[0],
			})
		}

		const { data: created, error } = await locals.supabase
			.from('worship_team_requests')
			.insert({
				user_id: user.id,
				email: user.email,
				full_name: parsed.data.fullName,
				roles: parsed.data.roles,
				message: parsed.data.message || null,
			})
			.select('id')
			.single()

		if (error) {
			// 23505: unique violation on user_id
			if (error.code === '23505') {
				return failure(409, values, {}, 'You have already sent a request.')
			}
			console.error('[worship-team] insert', error)
			return failure(
				500,
				values,
				{},
				"We couldn't send your request. Please try again later."
			)
		}

		// The email's "Review request" button opens this request for approval
		await notifyAdmins(
			parsed.data,
			user.email,
			`${url.origin}/admin/worship-requests/${created.id}`
		)

		return { success: true as const }
	},
} satisfies Actions
