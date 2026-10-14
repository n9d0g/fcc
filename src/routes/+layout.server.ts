import { getRoles, isWorshipMember } from '#lib/server/roles.js'

export const load = async ({ locals, cookies }) => {
	const { user } = await locals.safeGetSession()

	// Shows the Blog group in the account menu once author access is approved
	let isBlogAuthor = false
	if (user) {
		const { data, error } = await locals.supabase.rpc('is_blog_author')
		if (error) console.error('[layout] is_blog_author', error)
		isBlogAuthor = data === true
	}

	// Leader roles, for the account menu
	const roles = await getRoles(locals, user)

	return {
		user,
		isBlogAuthor,
		// Shows the Worship group in the account menu and the team-only praise links
		isWorshipMember: await isWorshipMember(locals, user, roles),
		roles,
		cookies: cookies.getAll(),
	}
}
