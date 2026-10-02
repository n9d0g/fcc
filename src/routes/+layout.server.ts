export const load = async ({ locals, cookies }) => {
	const { user } = await locals.safeGetSession()

	return {
		user,
		cookies: cookies.getAll(),
	}
}
