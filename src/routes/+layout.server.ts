import { client } from '#lib/config/index.js'
import { torontoToday } from '#lib/schemas/worship-availability.js'
import { getRoles, isWorshipMember } from '#lib/server/roles.js'

export const load = async ({ locals, cookies }) => {
	const [{ user }, banner] = await Promise.all([
		locals.safeGetSession(),
		// Only a banner whose start/end dates include today (Toronto time)
		client.fetch<App.Banner | null>(
			`*[_type == "banner" && !(_id in path("drafts.**")) && defined(date)
				&& (!defined(startDate) || startDate <= $today) && date >= $today]
				| order(_updatedAt desc)[0] { _id, _updatedAt, title, body, date }`,
			{ today: torontoToday() }
		),
	])

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
		banner: banner ?? undefined,
		user,
		isBlogAuthor,
		// Shows the Worship group in the account menu and the team-only praise links
		isWorshipMember: await isWorshipMember(locals, user, roles),
		roles,
		cookies: cookies.getAll(),
	}
}
