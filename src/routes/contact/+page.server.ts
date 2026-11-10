import ContactSubmission from '#lib/emails/ContactSubmission.svelte'
import ContactAutoReply from '#lib/emails/ContactAutoReply.svelte'
import { contactSchema, type ContactField } from '#lib/schemas/contact.js'
import { church } from '#lib/config/index.js'
import { torontoTimestamp } from '#lib/schemas/worship-availability.js'
import { send, trySend } from '#lib/server/notifier.js'
import { verifyTurnstile } from '#lib/server/turnstile.js'
import { CAPTCHA_FIELD } from '#lib/captcha.js'
import { z } from 'zod'
import { TURNSTILE_SECRET_KEY } from '$app/env/private'
import { fail } from '@sveltejs/kit'
import type { Actions } from './$types'

// Submissions go to the contact inbox, with a silent copy to the requests
// inbox. The auto-reply's Reply-To points at the church inbox.

type FieldErrors = Partial<Record<ContactField, string>>
type ContactValues = Record<ContactField, string>

const field = (formData: FormData, key: string) => {
	const value = formData.get(key)
	return typeof value === 'string' ? value : ''
}

const failure = (
	status: number,
	values: ContactValues,
	errors: FieldErrors = {},
	message?: string
) => fail(status, { values, errors, message })

// Best effort: the visitor's message already reached us, so a failed
// confirmation is logged rather than shown as an error.
const sendAutoReply = (name: string, email: string) =>
	trySend({
		to: email,
		replyTo: church.email,
		subject: 'Thanks for contacting Freedom in Christ Church',
		template: ContactAutoReply,
		props: { name },
	})

export const actions = {
	default: async ({ request, getClientAddress }) => {
		const formData = await request.formData()
		const values: ContactValues = {
			name: field(formData, 'name'),
			email: field(formData, 'email'),
			message: field(formData, 'message'),
		}

		const parsed = contactSchema.safeParse(values)
		if (!parsed.success) {
			const { fieldErrors } = z.flattenError(parsed.error)
			const errors: FieldErrors = {}
			for (const key of Object.keys(fieldErrors) as ContactField[]) {
				errors[key] = fieldErrors[key]?.[0]
			}
			return failure(400, values, errors)
		}

		try {
			const human = await verifyTurnstile({
				token: field(formData, CAPTCHA_FIELD),
				secret: TURNSTILE_SECRET_KEY,
				remoteip: getClientAddress(),
				logPrefix: '[contact]',
			})
			if (!human) {
				return failure(
					400,
					values,
					{},
					"We couldn't verify you're human. Please try again."
				)
			}

			const { name, email, message } = parsed.data
			try {
				await send({
					to: { inbox: 'contact' },
					bcc: { inbox: 'requests' },
					replyTo: email,
					subject: `FCC Contact Submission: ${name}`,
					template: ContactSubmission,
					props: { name, email, message, submittedAt: torontoTimestamp() },
				})
			} catch (e) {
				console.error('[contact] send submission', e)
				return failure(
					502,
					values,
					{},
					"We couldn't send your message. Please try again later."
				)
			}

			await sendAutoReply(name, email)

			return { success: true as const }
		} catch (e) {
			console.error('[contact]', e)
			return failure(
				500,
				values,
				{},
				'Something went wrong. Please try again later.'
			)
		}
	},
} satisfies Actions
