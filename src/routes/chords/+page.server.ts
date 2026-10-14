import { torontoToday } from '#lib/schemas/worship-availability.js'
import { error, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

// Short link to this week's chords: the next service with a PDF, or the most
// recent one if nothing upcoming has chords yet
export const load: PageServerLoad = async ({ locals }) => {
	const today = torontoToday()
	const withChords = () =>
		locals.supabase
			.from('worship_services')
			.select('chords_url')
			.not('chords_url', 'is', null)
			.limit(1)

	const [next, last] = await Promise.all([
		withChords().gte('service_date', today).order('service_date').maybeSingle(),
		withChords()
			.lt('service_date', today)
			.order('service_date', { ascending: false })
			.maybeSingle(),
	])
	const url = (next.data ?? last.data)?.chords_url
	if (url) throw redirect(302, url)

	throw error(404, 'No chords yet! Check back soon 🥲')
}
