import { z } from 'zod'
import type { User } from '@supabase/supabase-js'

export const ACCOUNT_LIMITS = {
	displayName: 20,
	passwordMin: 8,
} as const

/** Shown under every display name input, so the limit is known up front. */
export const DISPLAY_NAME_HINT = `Up to ${ACCOUNT_LIMITS.displayName} characters. A first name or nickname is fine.`

const DISPLAY_NAME_CHARSET_ERROR =
	'Names can only use letters, spaces, hyphens, apostrophes and periods.'

// Letters in any script (with accents), spaces, hyphens, straight and curly
// apostrophes (phones type ’) and periods.
const DISPLAY_NAME_CHARS = /^[\p{L}\p{M} '’.-]+$/u
// A period followed by two or more letters looks like a domain (myxa.cc), the
// usual spam payload. Initials like "J.R." still pass.
const LOOKS_LIKE_DOMAIN = /\.\p{L}{2,}/u

/** True when a (trimmed) name only uses the characters names may use. */
export const isAllowedDisplayName = (name: string) =>
	DISPLAY_NAME_CHARS.test(name) &&
	/\p{L}/u.test(name) &&
	!LOOKS_LIKE_DOMAIN.test(name)

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
		})
		.refine(isAllowedDisplayName, { error: DISPLAY_NAME_CHARSET_ERROR }),
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
