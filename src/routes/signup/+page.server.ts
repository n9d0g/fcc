import { displayNameSchema } from '#lib/schemas/account.js'
import { authErrorMessage, logAuthError } from '#lib/server/auth.js'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

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

		// Same rules as changing your name on /account
		const parsedName = displayNameSchema.safeParse({ displayName })
		if (!parsedName.success) {
			return fail(400, {
				error: parsedName.error.issues[0]?.message ?? 'Please check your name.',
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
			// The Requests inbox hears about it once the email is confirmed
			// (see verifyOtp on /login), so unconfirmed signups never reach it
			const { error } = await locals.supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${url.origin}/login`,
					// Shown as "Display name" in the Supabase dashboard
					data: { display_name: parsedName.data.displayName },
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
