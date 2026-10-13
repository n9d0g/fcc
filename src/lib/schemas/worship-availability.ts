/** How far ahead team members can block out Sundays. */
export const AVAILABILITY_WEEKS = 52

const DAY_MS = 24 * 60 * 60 * 1000

/** Today's date in Toronto as yyyy-MM-dd, regardless of the server's timezone. */
export const torontoToday = (now = new Date()) =>
	now.toLocaleDateString('en-CA', { timeZone: 'America/Toronto' })

/**
 * The next `count` Sundays as yyyy-MM-dd, starting with `today` if it is a
 * Sunday. Works in UTC on the date alone so DST changes can't skip a week.
 */
export const upcomingSundays = (today: string, count = AVAILABILITY_WEEKS) => {
	const start = new Date(`${today}T00:00:00Z`)
	start.setUTCDate(start.getUTCDate() + ((7 - start.getUTCDay()) % 7))
	return Array.from({ length: count }, (_, i) =>
		new Date(start.getTime() + i * 7 * DAY_MS).toISOString().slice(0, 10)
	)
}

/** "Sun, Oct 18, 2026" for a yyyy-MM-dd date. */
export const formatSunday = (date: string) =>
	new Date(`${date}T00:00:00Z`).toLocaleDateString('en-CA', {
		timeZone: 'UTC',
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})

// Row shape of public.worship_unavailability (supabase/migrations)
export type WorshipUnavailability = {
	user_id: string
	sunday: string
	created_at: string
}
