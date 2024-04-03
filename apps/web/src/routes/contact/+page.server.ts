import { GOOGLE_EMAIL } from '$env/static/private'
import transporter from '$lib/emailSetup.server.js'
import { z } from 'zod'

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

			// validate contact fields
			if (emailData.success === false) {
				const errors = emailData.error.flatten().fieldErrors
				console.log(errors)

				return {
					status: 400,
					errors: errors,
				}
			}

			const name = formData.get('name')
			const email = formData.get('email')
			const message = formData.get('message')

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
				success: 'Email has been sent!',
			}
		} catch (e) {
			console.log(e)
		}
	},
}
