// Shared by the /login, /signup and /account form actions

import { CAPTCHA_ERROR, CAPTCHA_FIELD } from '#lib/captcha.js'

/** The Turnstile token a form posted, for Supabase's captchaToken option. */
export const captchaTokenFrom = (formData: FormData) => {
	const token = formData.get(CAPTCHA_FIELD)
	return typeof token === 'string' && token ? token : undefined
}

/** True when Supabase rejected the request's Turnstile token (or its lack). */
export const isCaptchaError = (error: unknown) => {
	if (typeof error !== 'object' || error === null) return false
	const err = error as Record<string, unknown>
	return (
		err.code === 'captcha_failed' ||
		(typeof err.message === 'string' && /captcha/i.test(err.message))
	)
}

export const logAuthError = (context: string, error: unknown) => {
	if (typeof error === 'object' && error !== null) {
		const err = error as Record<string, unknown>
		console.error(`[auth ${context}]`, {
			message: err.message,
			status: err.status,
			code: err.code,
			__isAuthError: err.__isAuthError,
			raw: JSON.stringify(error, Object.getOwnPropertyNames(error)),
		})
	} else {
		console.error(`[auth ${context}]`, error)
	}
}

export const authErrorMessage = (error: unknown) => {
	if (isCaptchaError(error)) return CAPTCHA_ERROR

	if (typeof error === 'object' && error !== null) {
		const err = error as Record<string, unknown>
		const status = typeof err.status === 'number' ? err.status : undefined
		const message = typeof err.message === 'string' ? err.message : ''

		if (status && status >= 500 && (!message || message === '{}')) {
			return 'Authentication failed (server error). If signing up, the confirmation email could not be sent — check Supabase SMTP uses a Resend-verified sender (e.g. noreply@fcccanada.ca), not Gmail.'
		}

		if (message && message !== '{}') {
			return message
		}
	}

	if (error instanceof Error && error.message && error.message !== '{}') {
		return error.message
	}

	return 'Something went wrong. Please try again.'
}

// Only same-site paths, so ?redirectTo can't bounce users to another domain
export const safeRedirect = (value: unknown) =>
	typeof value === 'string' &&
	value.startsWith('/') &&
	!value.startsWith('//') &&
	!value.startsWith('/\\')
		? value
		: '/'
