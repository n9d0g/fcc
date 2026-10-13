import { isAdmin, type WorshipRequest } from '#lib/schemas/worship-team.js'
import { error, fail, redirect, type RequestEvent } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

const requireAdmin = async (locals: RequestEvent['locals']) => {
	const { user } = await locals.safeGetSession()
	if (!user) throw redirect(303, '/login')
	// 404 rather than 403 so the page's existence isn't advertised
	if (!isAdmin(user)) throw error(404, 'Not found')
	return user
}

export const load: PageServerLoad = async ({ locals }) => {
	await requireAdmin(locals)

	const { data: requests, error: err } = await locals.supabase
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

const review =
	(status: 'approved' | 'rejected'): Actions[string] =>
	async ({ request, locals }) => {
		const user = await requireAdmin(locals)
		const id = String((await request.formData()).get('id') ?? '')
		if (!id) return fail(400, { message: 'Missing request id.' })

		const { error: err } = await locals.supabase
			.from('worship_team_requests')
			.update({
				status,
				reviewed_at: new Date().toISOString(),
				reviewed_by: user.id,
			})
			.eq('id', id)

		if (err) {
			console.error(`[admin] ${status} worship request`, err)
			return fail(500, { message: 'Could not update the request.' })
		}

		return { status }
	}

export const actions = {
	approve: review('approved'),
	reject: review('rejected'),
} satisfies Actions
