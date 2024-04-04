import { GOOGLE_EMAIL } from '$env/static/private'
import transporter from '$lib/emailSetup.server.js'
import { z } from 'zod'
import { GOOGLE_RECAPTCHA_SECRET_KEY } from '$env/static/private'
import { fail } from '@sveltejs/kit'

const emailSchema = z.object({
	name: z.string().trim().min(1, { message: 'Name is required' }),
	email: z.string().trim().email().min(1, { message: 'Email is required' }),
	message: z.string().trim().min(1, { message: 'Message is required' }),
})

export const actions = {
	default: async ({ request }: { request: any }) => {
		try {
			const formData = Object.fromEntries(await request.formData())
			const emailData = emailSchema.safeParse(formData)
			const { name, email, message } = formData

			// validate contact fields
			if (emailData.success === false) {
				const errors = emailData.error.flatten().fieldErrors

				return fail(400, {
					errors: errors,
					name: name,
					email: email,
					message: message,
				})
			}

			// TODO: add recaptcha
			// const res = await fetch(
			// 	'https://www.google.com/recaptcha/api/siteverify',
			// 	{
			// 		method: 'POST',
			// 		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			// 		body: `secret=${GOOGLE_RECAPTCHA_SECRET_KEY}&response=${formData['g-recaptcha-response']}`,
			// 	}
			// )

			// const recaptchaRes = await res.json()

			let html = `
			<section>
				<h1>Name: ${name}</h1>
				<h2>Email: ${email}</h2>
				<p>Message: <br /> ${message}</p>
			</section>
			`

			const data = {
				from: `"Freedom in Christ Church" <${GOOGLE_EMAIL}>`,
				to: 'nate@fcccanada.ca',
				bcc: '',
				subject: `FCC Contact Submission: ${name}`,
				text: message,
				html: html,
			}

			const sendEmail = async (data: any) => {
				await new Promise((resolve, reject) => {
					transporter.sendMail(data, (err: any, info: any) => {
						if (err) {
							console.log(err)
							reject(err)
						} else {
							resolve(info)
						}
					})
				})
			}

			await sendEmail(data)

			return {
				status: 200,
				success: 'Email has been sent!',
			}
		} catch (e) {
			console.log(e)
		}
	},
}
