import NewAccountEmail from '#lib/emails/NewAccount.svelte'
import { displayNameOf } from '#lib/schemas/account.js'
import { torontoTimestamp } from '#lib/schemas/worship-availability.js'
import {
	authErrorMessage,
	captchaTokenFrom,
	logAuthError,
	safeRedirect,
} from '#lib/server/auth.js'
import { trySend } from '#lib/server/notifier.js'
import { fail, redirect } from '@sveltejs/kit'
import type { User } from '@supabase/supabase-js'
import type { Actions, PageServerLoad } from './$types'

// An account only counts as new once its email is confirmed (see GLOSSARY.md),
// so the Requests inbox hears about it here rather than at signup. Best
// effort: a failed notification shouldn't block the person signing in.
const notifyNewAccount = (user: User) => {
	const email = user.email ?? ''
	const displayName = displayNameOf(user) || email
	return trySend({
		to: { inbox: 'requests' },
		replyTo: email,
		subject: `New account: ${displayName}`,
		template: NewAccountEmail,
		props: { displayName, email, confirmedAt: torontoTimestamp() },
	})
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
				options: { captchaToken: captchaTokenFrom(formData) },
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
			const { data, error } = await locals.supabase.auth.verifyOtp({
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

			if (data.user) await notifyNewAccount(data.user)
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
				options: { captchaToken: captchaTokenFrom(formData) },
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
