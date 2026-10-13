import {
	displayNameOf,
	displayNameSchema,
	emailSchema,
	passwordSchema,
} from '#lib/schemas/account.js'
import { fail, redirect, type RequestEvent } from '@sveltejs/kit'
import { z } from 'zod'
import type { Actions, PageServerLoad } from './$types'

const requireUser = async ({ locals, url }: RequestEvent) => {
	const { user } = await locals.safeGetSession()
	if (!user) {
		throw redirect(303, `/login?redirectTo=${encodeURIComponent(url.pathname)}`)
	}
	return user
}

// Each form posts to its own action and gets its own errors back, keyed by
// `form` so the page knows which section to show them under
type Section = 'name' | 'email' | 'password'
const failure = (
	section: Section,
	status: number,
	errors: Record<string, string | undefined> = {},
	message?: string
) => fail(status, { form: section, errors, message })

const fieldErrors = (error: z.ZodError) =>
	Object.fromEntries(
		Object.entries(z.flattenError(error).fieldErrors).map(([k, v]) => [
			k,
			(v as string[] | undefined)?.[0],
		])
	)

export const load: PageServerLoad = async (event) => {
	const user = await requireUser(event)

	return {
		displayName: displayNameOf(user),
		email: user.email ?? '',
		// Set while an email change is waiting to be confirmed
		pendingEmail: user.new_email ?? null,
	}
}

export const actions = {
	name: async (event) => {
		await requireUser(event)
		const parsed = displayNameSchema.safeParse({
			displayName: String(
				(await event.request.formData()).get('displayName') ?? ''
			),
		})
		if (!parsed.success) return failure('name', 400, fieldErrors(parsed.error))

		const { error } = await event.locals.supabase.auth.updateUser({
			data: { display_name: parsed.data.displayName },
		})
		if (error) {
			console.error('[account] update name', error)
			return failure(
				'name',
				500,
				{},
				"We couldn't update your name. Please try again."
			)
		}

		return { form: 'name' as const, success: 'Your name has been updated.' }
	},

	email: async (event) => {
		const user = await requireUser(event)
		const parsed = emailSchema.safeParse({
			email: String((await event.request.formData()).get('email') ?? ''),
		})
		if (!parsed.success) return failure('email', 400, fieldErrors(parsed.error))
		if (parsed.data.email === user.email?.toLowerCase()) {
			return failure('email', 400, {
				email: "That's already your email address.",
			})
		}

		// Supabase emails a confirmation link (see SupabaseChangeEmail.svelte);
		// the address only changes once /auth/confirm verifies it
		const { error } = await event.locals.supabase.auth.updateUser(
			{ email: parsed.data.email },
			{ emailRedirectTo: `${event.url.origin}/auth/confirm` }
		)
		if (error) {
			console.error('[account] update email', error)
			return failure(
				'email',
				error.status && error.status < 500 ? 400 : 500,
				{},
				error.status && error.status < 500
					? error.message
					: "We couldn't start the email change. Please try again."
			)
		}

		return {
			form: 'email' as const,
			success: `Check ${parsed.data.email} for a confirmation link. Your email won't change until you press it.`,
		}
	},

	password: async (event) => {
		const user = await requireUser(event)
		const formData = await event.request.formData()
		const parsed = passwordSchema.safeParse({
			currentPassword: String(formData.get('currentPassword') ?? ''),
			newPassword: String(formData.get('newPassword') ?? ''),
			confirmPassword: String(formData.get('confirmPassword') ?? ''),
		})
		if (!parsed.success)
			return failure('password', 400, fieldErrors(parsed.error))

		const { supabase } = event.locals

		// Confirm it's really them before changing the password. Signing in
		// again also refreshes the session, which Supabase's "secure password
		// change" setting requires.
		const { error: signInError } = await supabase.auth.signInWithPassword({
			email: user.email ?? '',
			password: parsed.data.currentPassword,
		})
		if (signInError) {
			return failure('password', 400, {
				currentPassword: 'Your current password is incorrect.',
			})
		}

		const { error } = await supabase.auth.updateUser({
			password: parsed.data.newPassword,
		})
		if (error) {
			console.error('[account] update password', error)
			// e.g. "New password should be different from the old password."
			return failure(
				'password',
				error.status && error.status < 500 ? 400 : 500,
				{},
				error.status && error.status < 500
					? error.message
					: "We couldn't change your password. Please try again."
			)
		}

		return {
			form: 'password' as const,
			success: 'Your password has been changed.',
		}
	},
} satisfies Actions
