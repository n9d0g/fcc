import { client } from '#lib/config/index.js'
import { torontoToday } from '#lib/schemas/worship-availability.js'

export const load = async ({ locals, cookies }) => {
	const [viewer, banner] = await Promise.all([
		locals.viewer(),
		// Only a banner whose start/end dates include today (Toronto time)
		client.fetch<App.Banner | null>(
			`*[_type == "banner" && !(_id in path("drafts.**")) && defined(date)
				&& (!defined(startDate) || startDate <= $today) && date >= $today]
				| order(_updatedAt desc)[0] { _id, _updatedAt, title, body, date }`,
			{ today: torontoToday() }
		),
	])

	return {
		banner: banner ?? undefined,
		user: viewer.user,
		// The rest drive the account menu and the team-only praise links
		isSuperuser: viewer.isSuperuser,
		isBlogAuthor: viewer.isBlogAuthor,
		isWorshipMember: viewer.isWorshipMember,
		roles: viewer.roles,
		cookies: cookies.getAll(),
	}
}
