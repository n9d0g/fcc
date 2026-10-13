import { isAdmin } from '#lib/schemas/worship-team.js'
import { error, fail, redirect, type RequestEvent } from '@sveltejs/kit'

/**
 * Gate for the worship request admin pages. Signed-out visitors are sent to
 * log in and brought back here afterwards; signed-in non-admins get a 404 so
 * the page's existence isn't advertised.
 */
export const requireAdmin = async ({ locals, url }: RequestEvent) => {
	const { user } = await locals.safeGetSession()
	if (!user) {
		const redirectTo = url.pathname + url.search
		throw redirect(303, `/login?redirectTo=${encodeURIComponent(redirectTo)}`)
	}
	if (!isAdmin(user)) throw error(404, 'Not found')
	return user
}

/** Form action that approves or rejects the request whose id is posted. */
export const reviewAction =
	(status: 'approved' | 'rejected') => async (event: RequestEvent) => {
		const user = await requireAdmin(event)
		const id = String((await event.request.formData()).get('id') ?? '')
		if (!id) return fail(400, { message: 'Missing request id.' })

		const { data, error: err } = await event.locals.supabase
			.from('worship_team_requests')
			.update({
				status,
				reviewed_at: new Date().toISOString(),
				reviewed_by: user.id,
			})
			.eq('id', id)
			.select('id')

		if (err) {
			console.error(`[admin] ${status} worship request`, err)
			return fail(500, { message: 'Could not update the request.' })
		}
		// RLS filters rows silently, so an empty result means nothing changed
		if (!data?.length) {
			return fail(404, { message: 'That request no longer exists.' })
		}

		return { status }
	}
