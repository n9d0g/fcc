import {
	WORSHIP_POSITIONS,
	toScheduleRow,
	type WorshipService,
} from '#lib/schemas/worship-schedule.js'
import { torontoToday } from '#lib/schemas/worship-availability.js'
import { requireWorshipMember } from '#lib/server/roles.js'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

// Worship team only. Signed-out visitors are sent to log in and everyone else
// gets a 404; RLS on worship_services and worship_roster does the same.
export const load: PageServerLoad = async (event) => {
	await requireWorshipMember(event)
	const { locals } = event

	const [services, roster] = await Promise.all([
		locals.supabase
			.from('worship_services')
			.select()
			.gte('service_date', torontoToday())
			.order('service_date')
			.returns<WorshipService[]>(),
		locals.supabase
			.from('worship_roster')
			.select('position, name')
			.order('created_at')
			.returns<{ position: string; name: string }[]>(),
	])

	if (services.error) {
		console.error('[schedule] load services', services.error)
		throw error(500, 'Could not load the schedule')
	}
	if (roster.error) console.error('[schedule] load roster', roster.error)

	return {
		praise: services.data.map(toScheduleRow),
		// Same { role, names } shape the Sanity "praise-assignments" had
		praiseAssignments: WORSHIP_POSITIONS.map((p) => ({
			role: p.label,
			names: (roster.data ?? [])
				.filter((r) => r.position === p.value)
				.map((r) => r.name),
		})),
	}
}
