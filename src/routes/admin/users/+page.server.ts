import { isRole, type Role } from '#lib/schemas/roles.js'
import { requireAdmin } from '#lib/server/worship-requests.js'
import { error, fail } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

type SiteUser = { id: string; email: string; display_name: string | null }

// Superusers only: hand out and take back leader roles
export const load: PageServerLoad = async (event) => {
	await requireAdmin(event)

	const [users, grants] = await Promise.all([
		event.locals.supabase.rpc('admin_list_users'),
		event.locals.supabase
			.from('user_roles')
			.select('user_id, role')
			.returns<{ user_id: string; role: Role }[]>(),
	])

	if (users.error || grants.error) {
		console.error('[admin] load users', users.error ?? grants.error)
		throw error(500, 'Could not load users')
	}

	const rolesByUser = new Map<string, Role[]>()
	for (const { user_id, role } of grants.data) {
		rolesByUser.set(user_id, [...(rolesByUser.get(user_id) ?? []), role])
	}

	return {
		users: ((users.data ?? []) as SiteUser[]).map((u) => ({
			...u,
			roles: rolesByUser.get(u.id) ?? [],
		})),
	}
}

export const actions = {
	// Grants or revokes one role, depending on the posted `grant` flag
	setRole: async (event) => {
		const admin = await requireAdmin(event)
		const formData = await event.request.formData()
		const userId = String(formData.get('userId') ?? '')
		const role = String(formData.get('role') ?? '')
		const grant = formData.get('grant') === 'true'
		if (!userId || !isRole(role)) {
			return fail(400, { message: 'Pick a user and a role.' })
		}

		const { error: err } = grant
			? await event.locals.supabase
					.from('user_roles')
					.upsert(
						{ user_id: userId, role, granted_by: admin.id },
						{ onConflict: 'user_id,role', ignoreDuplicates: true }
					)
			: await event.locals.supabase
					.from('user_roles')
					.delete()
					.eq('user_id', userId)
					.eq('role', role)

		if (err) {
			console.error(`[admin] ${grant ? 'grant' : 'revoke'} role`, err)
			return fail(500, { message: 'Could not update roles.' })
		}

		return { userId, role, grant }
	},
} satisfies Actions
