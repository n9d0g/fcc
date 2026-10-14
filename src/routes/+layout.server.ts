import { getRoles } from '#lib/server/roles.js'

export const load = async ({ locals, cookies }) => {
	const { user } = await locals.safeGetSession()

	// Shows the Blog group in the account menu once author access is approved
	let isBlogAuthor = false
	if (user) {
		const { data, error } = await locals.supabase.rpc('is_blog_author')
		if (error) console.error('[layout] is_blog_author', error)
		isBlogAuthor = data === true
	}

	return {
		user,
		isBlogAuthor,
		// Leader roles, for the account menu
		roles: await getRoles(locals, user),
		cookies: cookies.getAll(),
	}
}
