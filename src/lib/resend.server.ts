import { Resend } from 'resend'
import { env } from '$env/dynamic/private'

let resend: Resend | undefined

export function getResend() {
	if (!resend) {
		const apiKey = env.RESEND_API_KEY
		if (!apiKey) {
			throw new Error('RESEND_API_KEY is not set')
		}
		resend = new Resend(apiKey)
	}
	return resend
}

export function getResendFromEmail() {
	const from = env.RESEND_FROM_EMAIL
	if (!from) {
		throw new Error('RESEND_FROM_EMAIL is not set')
	}
	return from
}
