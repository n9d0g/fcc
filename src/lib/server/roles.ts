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
