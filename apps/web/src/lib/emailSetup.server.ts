import nodemailer from 'nodemailer'
import { GOOGLE_EMAIL, GOOGLE_EMAIL_PASSWORD } from '$env/static/private'

let transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: GOOGLE_EMAIL,
		pass: GOOGLE_EMAIL_PASSWORD,
	},
})

transporter.verify((error: any, success: any) => {
	if (error) console.log(error)
	else console.log('server is ready to take our messages')
})

export default transporter
