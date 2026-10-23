import { requireAccess } from '#lib/server/access.js'
import { fail, type RequestEvent } from '@sveltejs/kit'

/** Form action that approves or rejects the request whose id is posted. */
export const reviewAction =
	(status: 'approved' | 'rejected') => async (event: RequestEvent) => {
		const { user } = await requireAccess(event, 'superuser')
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
