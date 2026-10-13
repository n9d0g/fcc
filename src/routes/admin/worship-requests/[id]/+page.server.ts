import { type WorshipRequest } from '#lib/schemas/worship-team.js'
import { requireAdmin, reviewAction } from '#lib/server/worship-requests.js'
import { error } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

// Linked from the "Review request" button in the new-request email
export const load: PageServerLoad = async (event) => {
	await requireAdmin(event)

	const { data: request, error: err } = await event.locals.supabase
		.from('worship_team_requests')
		.select('*')
		.eq('id', event.params.id)
		.maybeSingle<WorshipRequest>()

	if (err) {
		// 22P02: malformed uuid in the URL
		if (err.code === '22P02') throw error(404, 'Request not found')
		console.error('[admin] load worship request', err)
		throw error(500, 'Could not load the request')
	}
	if (!request) throw error(404, 'Request not found')

	return { request }
}

export const actions = {
	approve: reviewAction('approved'),
	reject: reviewAction('rejected'),
} satisfies Actions
