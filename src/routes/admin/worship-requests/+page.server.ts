import { type WorshipRequest } from '#lib/schemas/worship-team.js'
import { reviewAction } from '#lib/server/worship-requests.js'
import { error } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
	const { data: requests, error: err } = await event.locals.supabase
		.from('worship_team_requests')
		.select('*')
		.order('created_at', { ascending: false })
		.returns<WorshipRequest[]>()

	if (err) {
		console.error('[admin] load worship requests', err)
		throw error(500, 'Could not load requests')
	}

	return { requests }
}

export const actions = {
	approve: reviewAction('approved'),
	reject: reviewAction('rejected'),
} satisfies Actions
