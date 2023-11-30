import { GOOGLE_EMAIL } from '$env/static/private'
import transporter from '$lib/emailSetup.server.js'

export const actions = {
	default: async ({ request }: { request: any }) => {
		try {
			const formData = await request.formData()

			const name = formData.get('name')
			const message = formData.get('message')

			let html = `
			<section>
				<h1>Name: ${name}</h1>
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
