import { RESEND_FROM_EMAIL, resend } from '$lib/resend.server'
import { z } from 'zod'
import { GOOGLE_RECAPTCHA_SECRET_KEY } from '$env/static/private'
import { fail } from '@sveltejs/kit'

const emailSchema = z.object({
	name: z.string().trim().min(1, { message: 'Name is required' }),
	email: z.string().trim().email().min(1, { message: 'Email is required' }),
	message: z.string().trim().min(1, { message: 'Message is required' }),
})

export const actions = {
	default: async ({ request }: { request: Request }) => {
		try {
			const formData = Object.fromEntries(await request.formData())
			const emailData = emailSchema.safeParse(formData)
			const { name, email, message, grecaptcha } = formData

			if (emailData.success === false) {
				const errors = emailData.error.flatten().fieldErrors

				return fail(400, {
					errors: errors,
					name: name,
					email: email,
					message: message,
				})
			}

			const res = await fetch(
				'https://www.google.com/recaptcha/api/siteverify',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: `secret=${GOOGLE_RECAPTCHA_SECRET_KEY}&response=${grecaptcha}`,
				}
			)

			const recaptchaRes = await res.json()
			if (recaptchaRes.success === false) {
				return fail(400, {
					errors: {
						grecaptcha: 'ReCaptcha failed. Please try again.',
					},
					name: name,
					email: email,
					message: message,
				})
			}

			if (recaptchaRes.success === true) {
				if (recaptchaRes.score < 0.6) {
					return fail(400, {
						errors: {
							grecaptcha: 'ReCaptcha failed. Please try again.',
						},
						name: name,
						email: email,
						message: message,
					})
				}
			}

			const html = `
			<section>
				<h1>Name: ${name}</h1>
				<h2>Email: ${email}</h2>
				<p>Message: <br /> ${message}</p>
			</section>
			`

			const { error } = await resend.emails.send({
				from: `Freedom in Christ Church <${RESEND_FROM_EMAIL}>`,
				to: 'nate@njil.dev',
				replyTo: String(email),
				subject: `FCC Contact Submission: ${name}`,
				text: String(message),
				html,
			})

			if (error) {
				console.error(error)
				return fail(500, {
					errors: {
						grecaptcha: 'Failed to send email. Please try again later.',
					},
					name: name,
					email: email,
					message: message,
				})
			}

			return {
				status: 200,
				success: 'Email has been sent!',
			}
		} catch (e) {
			console.error(e)
			return fail(500, {
				errors: {
					grecaptcha: 'Failed to send email. Please try again later.',
				},
			})
		}
	},
}
