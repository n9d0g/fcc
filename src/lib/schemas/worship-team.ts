import { z } from 'zod'
import type { User } from '@supabase/supabase-js'

export const WORSHIP_ROLES = [
	{ value: 'vocals', label: 'Vocals', emoji: '🎤' },
	{ value: 'acoustic_guitar', label: 'Acoustic Guitar', emoji: '🎸' },
	{ value: 'electric_guitar', label: 'Electric Guitar', emoji: '⚡' },
	{ value: 'bass', label: 'Bass', emoji: '🎸' },
	{ value: 'keys', label: 'Keys', emoji: '🎹' },
	{ value: 'drums', label: 'Drums', emoji: '🥁' },
	{ value: 'other', label: 'Other', emoji: '🎶' },
] as const

export type WorshipRole = (typeof WORSHIP_ROLES)[number]['value']

export const roleLabel = (value: string) =>
	WORSHIP_ROLES.find((r) => r.value === value)?.label ?? value

export const WORSHIP_REQUEST_LIMITS = {
	fullName: 100,
	message: 1000,
} as const

export const worshipRequestSchema = z.object({
	fullName: z
		.string()
		.trim()
		.min(1, { error: 'Please enter your name.' })
		.max(WORSHIP_REQUEST_LIMITS.fullName, {
			error: `Name must be ${WORSHIP_REQUEST_LIMITS.fullName} characters or fewer.`,
		}),
	roles: z
		.array(z.enum(WORSHIP_ROLES.map((r) => r.value)))
		.min(1, { error: 'Pick at least one way you would like to serve.' }),
	message: z
		.string()
		.trim()
		.max(WORSHIP_REQUEST_LIMITS.message, {
			error: `Message must be ${WORSHIP_REQUEST_LIMITS.message} characters or fewer.`,
		}),
})

export type WorshipRequestStatus = 'pending' | 'approved' | 'rejected'

// Row shape of public.worship_team_requests (supabase/migrations)
export type WorshipRequest = {
	id: string
	user_id: string
	email: string
	full_name: string
	roles: string[]
	message: string | null
	status: WorshipRequestStatus
	created_at: string
	reviewed_at: string | null
	reviewed_by: string | null
}

// Mirrors public.is_admin(); RLS enforces it again on every query
export const isAdmin = (user: User | null | undefined) =>
	user?.app_metadata?.role === 'admin'
