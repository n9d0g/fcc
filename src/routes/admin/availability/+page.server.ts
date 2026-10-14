import { torontoToday } from '#lib/schemas/worship-availability.js'
import { requireRole } from '#lib/server/roles.js'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

type Row = {
	sunday: string
	worship_team_requests: { full_name: string; email: string; roles: string[] }
}

// Linked from the "View team availability" button in the availability email
export const load: PageServerLoad = async (event) => {
	await requireRole(event, 'worship_leader')

	const { data: rows, error: err } = await event.locals.supabase
		.from('worship_unavailability')
		.select('sunday, worship_team_requests!inner(full_name, email, roles)')
		.gte('sunday', torontoToday())
		.order('sunday')
		.returns<Row[]>()

	if (err) {
		console.error('[admin] load availability', err)
		throw error(500, 'Could not load availability')
	}

	const bySunday = new Map<string, Row['worship_team_requests'][]>()
	for (const row of rows) {
		bySunday.set(row.sunday, [
			...(bySunday.get(row.sunday) ?? []),
			row.worship_team_requests,
		])
	}

	return {
		sundays: [...bySunday].map(([sunday, members]) => ({
			sunday,
			members: members.sort((a, b) => a.full_name.localeCompare(b.full_name)),
		})),
	}
}
