import { torontoToday } from '#lib/schemas/worship-availability.js'
import { banner } from '#lib/server/content.js'

export const load = async ({ locals, cookies }) => {
	const [viewer, current] = await Promise.all([
		locals.viewer(),
		// Only a banner whose start/end dates include today (Toronto time)
		banner(torontoToday()),
	])

	return {
		banner: current ?? undefined,
		user: viewer.user,
		// The rest drive the account menu and the team-only praise links
		isSuperuser: viewer.isSuperuser,
		isBlogAuthor: viewer.isBlogAuthor,
		isWorshipMember: viewer.isWorshipMember,
		roles: viewer.roles,
		cookies: cookies.getAll(),
	}
}
