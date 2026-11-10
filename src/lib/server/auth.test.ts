import { describe, expect, it } from 'vite-plus/test'
import { CAPTCHA_ERROR } from '#lib/captcha.js'
import { authErrorMessage, captchaTokenFrom, isCaptchaError } from './auth.js'

const formWith = (entries: Record<string, string>) => {
	const formData = new FormData()
	for (const [k, v] of Object.entries(entries)) formData.set(k, v)
	return formData
}

describe('captchaTokenFrom', () => {
	it('reads the token Turnstile adds to the form', () => {
		expect(captchaTokenFrom(formWith({ 'cf-turnstile-response': 'abc' }))).toBe(
			'abc'
		)
	})

	it('leaves the token out when the widget never produced one', () => {
		expect(captchaTokenFrom(formWith({}))).toBeUndefined()
		expect(
			captchaTokenFrom(formWith({ 'cf-turnstile-response': '' }))
		).toBeUndefined()
	})
})

describe('isCaptchaError', () => {
	it("spots Supabase's captcha rejections", () => {
		expect(isCaptchaError({ code: 'captcha_failed', status: 400 })).toBe(true)
		expect(
			isCaptchaError({
				message: 'captcha protection: request disallowed (no captcha response)',
			})
		).toBe(true)
	})

	it('ignores other auth errors', () => {
		expect(
			isCaptchaError({
				code: 'invalid_credentials',
				message: 'Invalid login credentials',
			})
		).toBe(false)
		expect(isCaptchaError(null)).toBe(false)
	})
})

describe('authErrorMessage', () => {
	it('explains captcha failures in plain words', () => {
		expect(authErrorMessage({ code: 'captcha_failed', message: 'x' })).toBe(
			CAPTCHA_ERROR
		)
	})
})
