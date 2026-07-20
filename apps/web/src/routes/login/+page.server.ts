import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

const logAuthError = (context: string, error: unknown) => {
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

const authErrorMessage = (error: unknown) => {
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

export const load: PageServerLoad = async ({ locals }) => {
	const { session, user } = await locals.safeGetSession()

	if (session && user) {
		throw redirect(303, '/')
	}

	return {}
}

export const actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData()
		const email = String(formData.get('email') ?? '').trim()
		const password = String(formData.get('password') ?? '')

		if (!email || !password) {
			return fail(400, {
				mode: 'login',
				error: 'Email and password are required.',
				email,
			})
		}

		try {
			const { error } = await locals.supabase.auth.signInWithPassword({
				email,
				password,
			})

			if (error) {
				logAuthError('login', error)
				return fail(400, {
					mode: 'login',
					error: authErrorMessage(error),
					email,
				})
			}
		} catch (error) {
			logAuthError('login', error)
			return fail(500, {
				mode: 'login',
				error: authErrorMessage(error),
				email,
			})
		}

		throw redirect(303, '/')
	},

	signup: async ({ request, locals, url }) => {
		const formData = await request.formData()
		const email = String(formData.get('email') ?? '').trim()
		const password = String(formData.get('password') ?? '')

		if (!email || !password) {
			return fail(400, {
				mode: 'signup',
				error: 'Email and password are required.',
				email,
			})
		}

		if (password.length < 8) {
			return fail(400, {
				mode: 'signup',
				error: 'Password must be at least 8 characters.',
				email,
			})
		}

		try {
			const { error } = await locals.supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${url.origin}/login`,
				},
			})

			if (error) {
				logAuthError('signup', error)
				return fail(400, {
					mode: 'signup',
					error: authErrorMessage(error),
					email,
				})
			}
		} catch (error) {
			logAuthError('signup', error)
			return fail(500, {
				mode: 'signup',
				error: authErrorMessage(error),
				email,
			})
		}

		return {
			mode: 'confirm',
			success:
				'Account created. Check your email for a confirmation code, then enter it below.',
			email,
		}
	},

	verifyOtp: async ({ request, locals }) => {
		const formData = await request.formData()
		const email = String(formData.get('email') ?? '').trim()
		const token = String(formData.get('token') ?? '').trim()

		if (!email || !token) {
			return fail(400, {
				mode: 'confirm',
				error: 'Email and confirmation code are required.',
				email,
			})
		}

		try {
			const { error } = await locals.supabase.auth.verifyOtp({
				email,
				token,
				type: 'email',
			})

			if (error) {
				logAuthError('verifyOtp', error)
				return fail(400, {
					mode: 'confirm',
					error: authErrorMessage(error),
					email,
				})
			}
		} catch (error) {
			logAuthError('verifyOtp', error)
			return fail(500, {
				mode: 'confirm',
				error: authErrorMessage(error),
				email,
			})
		}

		throw redirect(303, '/')
	},

	resendOtp: async ({ request, locals }) => {
		const formData = await request.formData()
		const email = String(formData.get('email') ?? '').trim()

		if (!email) {
			return fail(400, {
				mode: 'confirm',
				error: 'Email is required to resend a code.',
				email,
			})
		}

		try {
			const { error } = await locals.supabase.auth.resend({
				type: 'signup',
				email,
			})

			if (error) {
				logAuthError('resendOtp', error)
				return fail(400, {
					mode: 'confirm',
					error: authErrorMessage(error),
					email,
				})
			}
		} catch (error) {
			logAuthError('resendOtp', error)
			return fail(500, {
				mode: 'confirm',
				error: authErrorMessage(error),
				email,
			})
		}

		return {
			mode: 'confirm',
			success: 'A new confirmation code has been sent to your email.',
			email,
		}
	},
} satisfies Actions
