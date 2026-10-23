import { SITE_URL } from '#lib/config/seo.js'
import PrayerReminderEmail from '#lib/emails/PrayerReminder.svelte'
import PrayerAssignmentEmail from '#lib/emails/PrayerAssignment.svelte'
import {
	daysBetween,
	formatMeetingDate,
	reminderDue,
	type PrayerMeeting,
	type ReminderKind,
} from '#lib/schemas/prayer.js'
import { torontoToday } from '#lib/schemas/worship-availability.js'
import { findMember, send, trySend } from '#lib/server/notifier.js'
import { sendOnce, type Ledger } from '#lib/server/send-once.js'
import { getSupabaseAdmin } from '#lib/supabase/admin.server.js'

type Reminder = {
	meeting_id: string
	leader_user_id: string
	kind: ReminderKind
}

// One row per reminder sent; the primary key rejects a second claim
const reminderLedger = (
	db: ReturnType<typeof getSupabaseAdmin>
): Ledger<Reminder> => ({
	async claim(reminder) {
		const { error } = await db.from('prayer_reminders').insert(reminder)
		// 23505: already claimed
		if (error?.code === '23505') return false
		if (error) throw error
		return true
	},
	async release(reminder) {
		await db.from('prayer_reminders').delete().match(reminder)
	},
})

// Uses the real day count, since a late assignment or a missed run can send
// the "two weeks" or "one week" reminder a few days later than its name says
const subject = (daysUntil: number, date: string) =>
	daysUntil === 0
		? "You're leading the prayer meeting devotional tonight"
		: `Prayer meeting devotional ${daysUntil === 1 ? 'tomorrow' : `in ${daysUntil} days`}: ${date}`

/**
 * Emails linked devotional leaders whose meeting is 14, 7 or 0 days away (see
 * reminderDue). Safe to run more than once a day: every reminder is recorded
 * in prayer_reminders and only ever sent once.
 */
export async function sendPrayerReminders(today = torontoToday()) {
	const db = getSupabaseAdmin()
	const until = new Date(Date.parse(`${today}T00:00:00Z`) + 14 * 86_400_000)
		.toISOString()
		.slice(0, 10)

	const { data: meetings, error } = await db
		.from('prayer_meetings')
		.select('id, meeting_date, leader_name, leader_user_id, scripture')
		.not('leader_user_id', 'is', null)
		.gte('meeting_date', today)
		.lte('meeting_date', until)
		.returns<PrayerMeeting[]>()
	if (error) throw error
	if (!meetings.length) return { checked: 0, sent: [] as string[] }

	const { data: reminders, error: remindersError } = await db
		.from('prayer_reminders')
		.select('meeting_id, leader_user_id, kind')
		.in(
			'meeting_id',
			meetings.map((m) => m.id)
		)
		.returns<Reminder[]>()
	if (remindersError) throw remindersError

	const ledger = reminderLedger(db)
	const sent: string[] = []
	for (const meeting of meetings) {
		const leaderId = meeting.leader_user_id!
		const already = new Set(
			reminders
				.filter(
					(r) => r.meeting_id === meeting.id && r.leader_user_id === leaderId
				)
				.map((r) => r.kind)
		)
		const daysUntil = daysBetween(today, meeting.meeting_date)
		const kind = reminderDue(daysUntil, already)
		if (!kind) continue

		try {
			const leader = await findMember(leaderId)
			if (!leader) {
				console.warn('[prayer] no email for leader', leaderId)
				continue
			}

			const result = await sendOnce(
				ledger,
				{ meeting_id: meeting.id, leader_user_id: leaderId, kind },
				async () => {
					await send({
						to: leader.email,
						subject: subject(
							daysUntil,
							formatMeetingDate(meeting.meeting_date, 'short')
						),
						template: PrayerReminderEmail,
						props: {
							name: leader.displayName || meeting.leader_name || 'there',
							kind,
							date: formatMeetingDate(meeting.meeting_date),
							daysUntil,
							scripture: meeting.scripture ?? '',
							scheduleUrl: `${SITE_URL}/ministries/prayer`,
						},
					})
					return 1
				}
			)
			if (result) sent.push(`${meeting.meeting_date} ${kind}`)
		} catch (e) {
			// The claim was released, so tomorrow's run tries again
			console.error('[prayer] reminder for meeting', meeting.id, e)
		}
	}

	return { checked: meetings.length, sent }
}

/**
 * Tells a linked leader they've been scheduled (or that their date moved).
 * Best effort: the meeting is already saved, so failures are logged and the
 * function returns false rather than throwing.
 */
export async function notifyPrayerAssignment(meeting: {
	leaderUserId: string
	leaderName: string | null
	meetingDate: string
	scripture: string | null
	/** The leader's old date, when only the date changed */
	previousDate?: string
}) {
	try {
		const leader = await findMember(meeting.leaderUserId)
		if (!leader) {
			console.warn('[prayer] no email for leader', meeting.leaderUserId)
			return false
		}
		const short = formatMeetingDate(meeting.meetingDate, 'short')
		return await trySend({
			to: leader.email,
			subject: meeting.previousDate
				? `Your prayer meeting devotional moved to ${short}`
				: `You're leading the prayer meeting devotional on ${short}`,
			template: PrayerAssignmentEmail,
			props: {
				name: leader.displayName || meeting.leaderName || 'there',
				date: formatMeetingDate(meeting.meetingDate),
				previousDate: meeting.previousDate
					? formatMeetingDate(meeting.previousDate)
					: '',
				scripture: meeting.scripture ?? '',
				scheduleUrl: `${SITE_URL}/ministries/prayer`,
			},
		})
	} catch (e) {
		console.error('[prayer] notify assignment', e)
		return false
	}
}
