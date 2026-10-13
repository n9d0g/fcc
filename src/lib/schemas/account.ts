import { z } from 'zod'
import type { User } from '@supabase/supabase-js'

export const ACCOUNT_LIMITS = {
	displayName: 100,
	passwordMin: 8,
} as const

/** user_metadata.display_name, set at signup or on /account. */
export const displayNameOf = (user: User | null | undefined) =>
	typeof user?.user_metadata?.display_name === 'string'
		? user.user_metadata.display_name.trim()
		: ''

export const displayNameSchema = z.object({
	displayName: z
		.string()
		.trim()
		.min(1, { error: 'Please enter your name.' })
		.max(ACCOUNT_LIMITS.displayName, {
			error: `Name must be ${ACCOUNT_LIMITS.displayName} characters or fewer.`,
		}),
})

export const emailSchema = z.object({
	email: z
		.email({ error: 'Please enter a valid email address.' })
		.trim()
		.toLowerCase(),
})

export const passwordSchema = z
	.object({
		currentPassword: z
			.string()
			.min(1, { error: 'Please enter your current password.' }),
		newPassword: z.string().min(ACCOUNT_LIMITS.passwordMin, {
			error: `Password must be at least ${ACCOUNT_LIMITS.passwordMin} characters.`,
		}),
		confirmPassword: z.string(),
	})
	.refine((v) => v.newPassword === v.confirmPassword, {
		error: "Passwords don't match.",
		path: ['confirmPassword'],
	})
