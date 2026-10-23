// Mirrors the public.app_role enum (supabase/migrations/20261019000000_user_roles.sql).
// Superusers (app_metadata.role = 'admin') implicitly hold every role.
export const ROLES = [
	{
		value: 'prayer_leader',
		label: 'Prayer leader',
		description: 'Sets the prayer meeting schedule.',
	},
	{
		value: 'worship_leader',
		label: 'Worship leader',
		description: 'Sees song usage and adds songs.',
	},
] as const

export type Role = (typeof ROLES)[number]['value']

export const isRole = (value: string): value is Role =>
	ROLES.some((r) => r.value === value)
