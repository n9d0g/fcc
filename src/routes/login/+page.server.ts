import { getResend, getResendFromEmail } from '#lib/resend.server.js'
import { renderEmail } from '#lib/emails/render.server.js'
import NewAccountEmail from '#lib/emails/NewAccount.svelte'
import { ACCOUNT_LIMITS } from '#lib/schemas/account.js'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

const SIGNUP_INBOX = 'nate@njil.dev'
const DISPLAY_NAME_MAX = ACCOUNT_LIMITS.displayName

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

// Only same-site paths, so ?redirectTo can't bounce users to another domain
const safeRedirect = (value: unknown) =>
	typeof value === 'string' &&
	value.startsWith('/') &&
	!value.startsWith('//') &&
	!value.startsWith('/\\')
		? value
		: '/'

// Best effort: a failed notification shouldn't block the person signing up
async function notifyNewAccount(displayName: string, email: string) {
	try {
		const { html, text } = await renderEmail(NewAccountEmail, {
			displayName,
			email,
			registeredAt: new Date().toLocaleString('en-CA', {
				timeZone: 'America/Toronto',
				dateStyle: 'medium',
				timeStyle: 'short',
			}),
		})
		const { error } = await getResend().emails.send({
			from: `Freedom in Christ Church <${getResendFromEmail()}>`,
			to: SIGNUP_INBOX,
			replyTo: email,
			subject: `New account: ${displayName}`,
			html,
			text,
		})
		if (error) console.error('[auth signup] resend error', error)
	} catch (e) {
		console.error('[auth signup] notify', e)
	}
}

export const load: PageServerLoad = async ({ locals, url }) => {
	const { session, user } = await locals.safeGetSession()

	if (session && user) {
		throw redirect(303, safeRedirect(url.searchParams.get('redirectTo')))
	}

	return {}
}

export const actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData()
		const email = String(formData.get('email') ?? '').trim()
		const password = String(formData.get('password') ?? '')
		const redirectTo = safeRedirect(formData.get('redirectTo'))

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

		throw redirect(303, redirectTo)
	},

	signup: async ({ request, locals, url }) => {
		const formData = await request.formData()
		const displayName = String(formData.get('displayName') ?? '').trim()
		const email = String(formData.get('email') ?? '').trim()
		const password = String(formData.get('password') ?? '')

		if (!displayName || !email || !password) {
			return fail(400, {
				mode: 'signup',
				error: 'Name, email and password are required.',
				displayName,
				email,
			})
		}

		if (displayName.length > DISPLAY_NAME_MAX) {
			return fail(400, {
				mode: 'signup',
				error: `Name must be ${DISPLAY_NAME_MAX} characters or fewer.`,
				displayName,
				email,
			})
		}

		if (password.length < 8) {
			return fail(400, {
				mode: 'signup',
				error: 'Password must be at least 8 characters.',
				displayName,
				email,
			})
		}

		try {
			const { data, error } = await locals.supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${url.origin}/login`,
					// Shown as "Display name" in the Supabase dashboard
					data: { display_name: displayName },
				},
			})

			if (error) {
				logAuthError('signup', error)
				return fail(400, {
					mode: 'signup',
					error: authErrorMessage(error),
					displayName,
					email,
				})
			}

			// Supabase answers a signup for an existing email with a fake user
			// that has no identities, so only notify for genuinely new accounts
			if (data.user?.identities?.length) {
				await notifyNewAccount(displayName, email)
			}
		} catch (error) {
			logAuthError('signup', error)
			return fail(500, {
				mode: 'signup',
				error: authErrorMessage(error),
				displayName,
				email,
			})
		}

		return {
			mode: 'signup',
			success:
				'Account created. Check your email and press the "Confirm email" button to finish signing up.',
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

		// The root layout celebrates the new account when it sees ?welcome
		throw redirect(303, '/?welcome')
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
