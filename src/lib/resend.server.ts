import { Resend } from 'resend'
import { RESEND_API_KEY, RESEND_FROM_EMAIL } from '$app/env/private'

let resend: Resend | undefined

export function getResend() {
	if (!resend) {
		const apiKey = RESEND_API_KEY
		if (!apiKey) {
			throw new Error('RESEND_API_KEY is not set')
		}
		resend = new Resend(apiKey)
	}
	return resend
}

export function getResendFromEmail() {
	const from = RESEND_FROM_EMAIL
	if (!from) {
		throw new Error('RESEND_FROM_EMAIL is not set')
	}
	return from
}
