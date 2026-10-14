import { hasRole, isRole, type Role } from '#lib/schemas/roles.js'
import { isAdmin } from '#lib/schemas/worship-team.js'
import { error, redirect, type RequestEvent } from '@sveltejs/kit'
import type { User } from '@supabase/supabase-js'

/** Leader roles granted to the signed-in user (not counting superuser). */
export const getRoles = async (
	locals: RequestEvent['locals'],
	user: User | null
): Promise<Role[]> => {
	if (!user) return []
	const { data, error: err } = await locals.supabase
		.from('user_roles')
		.select('role')
		.eq('user_id', user.id)
	if (err) {
		console.error('[roles] load roles', err)
		return []
	}
	return (data ?? []).map((r) => String(r.role)).filter(isRole)
}

/**
 * Like requireAdmin, but also lets in users granted `role`. Signed-out
 * visitors are sent to log in; everyone else gets a 404.
 */
export const requireRole = async (
	{ locals, url }: RequestEvent,
	role: Role
) => {
	const { user } = await locals.safeGetSession()
	if (!user) {
		const redirectTo = url.pathname + url.search
		throw redirect(303, `/login?redirectTo=${encodeURIComponent(redirectTo)}`)
	}
	if (!isAdmin(user) && !hasRole(user, await getRoles(locals, user), role)) {
		throw error(404, 'Not found')
	}
	return user
}

/**
 * Approved worship team members, worship leaders and superusers. Mirrors
 * public.is_worship_member(); RLS enforces it again on the schedule tables.
 */
export const isWorshipMember = async (
	locals: RequestEvent['locals'],
	user: User | null,
	roles?: readonly Role[]
) => {
	if (!user) return false
	if (
		hasRole(user, roles ?? (await getRoles(locals, user)), 'worship_leader')
	) {
		return true
	}
	const { data, error: err } = await locals.supabase.rpc('is_worship_team')
	if (err) console.error('[roles] is_worship_team', err)
	return data === true
}

/**
 * Worship team pages. Signed-out visitors are sent to log in; everyone else
 * gets a 404.
 */
export const requireWorshipMember = async ({ locals, url }: RequestEvent) => {
	const { user } = await locals.safeGetSession()
	if (!user) {
		const redirectTo = url.pathname + url.search
		throw redirect(303, `/login?redirectTo=${encodeURIComponent(redirectTo)}`)
	}
	if (!(await isWorshipMember(locals, user))) throw error(404, 'Not found')
	return user
}
