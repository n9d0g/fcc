import { z } from 'zod'

export const PRAYER_LIMITS = { leaderName: 100, scripture: 200 } as const

// Row shape of public.prayer_meetings (supabase/migrations)
export type PrayerMeeting = {
	id: string
	meeting_date: string
	leader_name: string | null
	leader_user_id: string | null
	scripture: string | null
}

export const prayerMeetingSchema = z.object({
	meetingDate: z.iso.date({ error: 'Please pick a date.' }),
	leaderName: z
		.string()
		.trim()
		.max(PRAYER_LIMITS.leaderName, {
			error: `Name must be ${PRAYER_LIMITS.leaderName} characters or fewer.`,
		}),
	leaderUserId: z.union([z.uuid(), z.literal('')]),
	scripture: z
		.string()
		.trim()
		.max(PRAYER_LIMITS.scripture, {
			error: `Scripture must be ${PRAYER_LIMITS.scripture} characters or fewer.`,
		}),
})

export type ReminderKind = 'two_weeks' | 'one_week' | 'day_of'

const DAY_MS = 24 * 60 * 60 * 1000

/** Whole days from `from` to `to`, both yyyy-MM-dd. */
export const daysBetween = (from: string, to: string) =>
	Math.round(
		(Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / DAY_MS
	)

/**
 * The reminder to send now, if any. Works off ranges rather than exact days,
 * so a missed cron run or a late assignment still gets the reminders that
 * apply: two weeks (8–14 days out), one week (1–7 days) and the day of.
 */
export const reminderDue = (
	daysUntil: number,
	sent: ReadonlySet<ReminderKind>
) => {
	if (daysUntil === 0) return sent.has('day_of') ? null : 'day_of'
	if (daysUntil >= 1 && daysUntil <= 7)
		return sent.has('one_week') ? null : 'one_week'
	if (daysUntil >= 8 && daysUntil <= 14)
		return sent.has('two_weeks') ? null : 'two_weeks'
	return null
}

/** The next `count` Wednesdays (prayer meeting night) on or after `today`. */
export const upcomingWednesdays = (today: string, count: number) => {
	const start = new Date(`${today}T00:00:00Z`)
	start.setUTCDate(start.getUTCDate() + ((3 - start.getUTCDay() + 7) % 7))
	return Array.from({ length: count }, (_, i) =>
		new Date(start.getTime() + i * 7 * DAY_MS).toISOString().slice(0, 10)
	)
}

/** "Wednesday, October 28, 2026" for a yyyy-MM-dd date. */
export const formatMeetingDate = (
	date: string,
	weekday: 'long' | 'short' = 'long'
) =>
	new Date(`${date}T00:00:00Z`).toLocaleDateString('en-CA', {
		timeZone: 'UTC',
		weekday,
		month: weekday,
		day: 'numeric',
		year: 'numeric',
	})
