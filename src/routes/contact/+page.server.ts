import { getResend, getResendFromEmail } from '#lib/resend.server.js'
import { renderEmail } from '#lib/emails/render.server.js'
import ContactSubmission from '#lib/emails/ContactSubmission.svelte'
import ContactAutoReply from '#lib/emails/ContactAutoReply.svelte'
import { contactSchema, type ContactField } from '#lib/schemas/contact.js'
import { z } from 'zod'
import { GOOGLE_RECAPTCHA_SECRET_KEY } from '$app/env/private'
import { fail } from '@sveltejs/kit'
import type { Actions } from './$types'

const CONTACT_INBOX = 'nate@njil.dev'
const RECAPTCHA_MIN_SCORE = 0.6

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

async function verifyRecaptcha(token: string) {
	if (!token) {
		console.warn('[contact] recaptcha: no token submitted')
		return false
	}
	if (!GOOGLE_RECAPTCHA_SECRET_KEY) {
		console.error('[contact] recaptcha: GOOGLE_RECAPTCHA_SECRET_KEY is not set')
		return false
	}

	const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
		method: 'POST',
		body: new URLSearchParams({
			secret: GOOGLE_RECAPTCHA_SECRET_KEY,
			response: token,
		}),
	})
	if (!res.ok) {
		console.error('[contact] recaptcha: siteverify HTTP', res.status)
		return false
	}

	const result: {
		success: boolean
		score?: number
		action?: string
		hostname?: string
		'error-codes'?: string[]
	} = await res.json()

	const passed =
		result.success &&
		result.action === 'contact' &&
		(result.score ?? 0) >= RECAPTCHA_MIN_SCORE

	// Log Google's verdict (never the token) so failures are diagnosable
	if (!passed) console.warn('[contact] recaptcha rejected', result)

	return passed
}

// Best effort: the visitor's message already reached us, so a failed
// confirmation is logged rather than shown as an error.
async function sendAutoReply(name: string, email: string) {
	try {
		const { html, text } = await renderEmail(ContactAutoReply, { name })
		const { error } = await getResend().emails.send({
			from: `Freedom in Christ Church <${getResendFromEmail()}>`,
			to: email,
			replyTo: CONTACT_INBOX,
			subject: 'Thanks for contacting Freedom in Christ Church',
			html,
			text,
		})
		if (error) console.error('[contact] auto-reply resend error', error)
	} catch (e) {
		console.error('[contact] auto-reply', e)
	}
}

export const actions = {
	default: async ({ request }) => {
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
			if (!(await verifyRecaptcha(field(formData, 'grecaptcha')))) {
				return failure(
					400,
					values,
					{},
					"We couldn't verify you're human. Please try again."
				)
			}

			const { name, email, message } = parsed.data
			const { html, text } = await renderEmail(ContactSubmission, {
				name,
				email,
				message,
				submittedAt: new Date().toLocaleString('en-CA', {
					timeZone: 'America/Toronto',
					dateStyle: 'medium',
					timeStyle: 'short',
				}),
			})

			const { error } = await getResend().emails.send({
				from: `Freedom in Christ Church <${getResendFromEmail()}>`,
				to: CONTACT_INBOX,
				replyTo: email,
				subject: `FCC Contact Submission: ${name}`,
				html,
				text,
			})

			if (error) {
				console.error('[contact] resend error', error)
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
