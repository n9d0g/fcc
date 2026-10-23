import NewAccountEmail from '#lib/emails/NewAccount.svelte'
import { ACCOUNT_LIMITS } from '#lib/schemas/account.js'
import { torontoTimestamp } from '#lib/schemas/worship-availability.js'
import { authErrorMessage, logAuthError } from '#lib/server/auth.js'
import { trySend } from '#lib/server/notifier.js'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

const DISPLAY_NAME_MAX = ACCOUNT_LIMITS.displayName

// Best effort: a failed notification shouldn't block the person signing up
const notifyNewAccount = (displayName: string, email: string) =>
	trySend({
		to: { inbox: 'requests' },
		replyTo: email,
		subject: `New account: ${displayName}`,
		template: NewAccountEmail,
		props: { displayName, email, registeredAt: torontoTimestamp() },
	})

export const load: PageServerLoad = async ({ locals }) => {
	const { session, user } = await locals.safeGetSession()

	if (session && user) throw redirect(303, '/')

	return {}
}

export const actions = {
	default: async ({ request, locals, url }) => {
		const formData = await request.formData()
		const displayName = String(formData.get('displayName') ?? '').trim()
		const email = String(formData.get('email') ?? '').trim()
		const password = String(formData.get('password') ?? '')

		if (!displayName || !email || !password) {
			return fail(400, {
				error: 'Name, email and password are required.',
				displayName,
				email,
			})
		}

		if (displayName.length > DISPLAY_NAME_MAX) {
			return fail(400, {
				error: `Name must be ${DISPLAY_NAME_MAX} characters or fewer.`,
				displayName,
				email,
			})
		}

		if (password.length < 8) {
			return fail(400, {
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
				error: authErrorMessage(error),
				displayName,
				email,
			})
		}

		return {
			success:
				'Account created. Check your email and press the "Confirm email" button to finish signing up.',
			displayName,
			email,
		}
	},
} satisfies Actions
