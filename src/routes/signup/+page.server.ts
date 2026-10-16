import { getResend, getResendFromEmail } from '#lib/resend.server.js'
import { renderEmail } from '#lib/emails/render.server.js'
import NewAccountEmail from '#lib/emails/NewAccount.svelte'
import { ACCOUNT_LIMITS } from '#lib/schemas/account.js'
import { authErrorMessage, logAuthError } from '#lib/server/auth.js'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

const SIGNUP_INBOX = 'nate@njil.dev'
const DISPLAY_NAME_MAX = ACCOUNT_LIMITS.displayName

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
