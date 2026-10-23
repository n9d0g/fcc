import { torontoToday } from '#lib/schemas/worship-availability.js'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

type Row = { sunday: string; full_name: string; email: string; roles: string[] }
type Member = Omit<Row, 'sunday'>

// Linked from the "View team availability" button in the availability email
export const load: PageServerLoad = async ({ locals }) => {
	const { data, error: err } = await locals.supabase.rpc(
		'worship_unavailability_members',
		{ from_date: torontoToday() }
	)

	if (err) {
		console.error('[admin] load availability', err)
		throw error(500, 'Could not load availability')
	}

	const bySunday = new Map<string, Member[]>()
	for (const { sunday, ...member } of (data ?? []) as Row[]) {
		bySunday.set(sunday, [...(bySunday.get(sunday) ?? []), member])
	}

	return {
		sundays: [...bySunday].map(([sunday, members]) => ({
			sunday,
			members: members.sort((a, b) => a.full_name.localeCompare(b.full_name)),
		})),
	}
}
