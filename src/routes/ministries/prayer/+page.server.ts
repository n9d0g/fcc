import type { PrayerMeeting } from '#lib/schemas/prayer.js'
import { torontoToday } from '#lib/schemas/worship-availability.js'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const [{ data: meetings, error }, { user }] = await Promise.all([
		locals.supabase
			.from('prayer_meetings')
			.select('id, meeting_date, leader_name, scripture')
			.gte('meeting_date', torontoToday())
			.order('meeting_date')
			.returns<Omit<PrayerMeeting, 'leader_user_id'>[]>(),
		locals.safeGetSession(),
	])
	if (error) console.error('[prayer] load schedule', error)

	// The signed-in leader's own upcoming devotionals, for the banner
	let mine: string[] = []
	if (user) {
		const { data } = await locals.supabase
			.from('prayer_meetings')
			.select('meeting_date')
			.eq('leader_user_id', user.id)
			.gte('meeting_date', torontoToday())
			.order('meeting_date')
			.returns<{ meeting_date: string }[]>()
		mine = (data ?? []).map((m) => m.meeting_date)
	}

	return { prayerData: meetings ?? [], mine }
}
