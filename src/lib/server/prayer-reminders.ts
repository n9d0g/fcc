import { SITE_URL } from '#lib/config/seo.js'
import { renderEmail } from '#lib/emails/render.server.js'
import PrayerReminderEmail from '#lib/emails/PrayerReminder.svelte'
import PrayerAssignmentEmail from '#lib/emails/PrayerAssignment.svelte'
import { getResend, getResendFromEmail } from '#lib/resend.server.js'
import {
	daysBetween,
	formatMeetingDate,
	reminderDue,
	type PrayerMeeting,
	type ReminderKind,
} from '#lib/schemas/prayer.js'
import { torontoToday } from '#lib/schemas/worship-availability.js'
import { getSupabaseAdmin } from '#lib/supabase/admin.server.js'

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
		.returns<
			{ meeting_id: string; leader_user_id: string; kind: ReminderKind }[]
		>()
	if (remindersError) throw remindersError

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
			const { data: userData, error: userError } =
				await db.auth.admin.getUserById(leaderId)
			if (userError || !userData.user?.email) {
				console.warn('[prayer] no email for leader', leaderId, userError)
				continue
			}
			const user = userData.user
			const displayName =
				typeof user.user_metadata?.display_name === 'string'
					? user.user_metadata.display_name.trim()
					: ''

			// Claim first so an overlapping run can't send the same reminder twice
			const { error: claimError } = await db
				.from('prayer_reminders')
				.insert({ meeting_id: meeting.id, leader_user_id: leaderId, kind })
			if (claimError) {
				if (claimError.code === '23505') continue
				throw claimError
			}

			const date = formatMeetingDate(meeting.meeting_date)
			const { html, text } = await renderEmail(PrayerReminderEmail, {
				name: displayName || meeting.leader_name || 'there',
				kind,
				date,
				daysUntil,
				scripture: meeting.scripture ?? '',
				scheduleUrl: `${SITE_URL}/ministries/prayer`,
			})
			const { error: sendError } = await getResend().emails.send({
				from: `Freedom in Christ Church <${getResendFromEmail()}>`,
				to: user.email!,
				subject: subject(
					daysUntil,
					formatMeetingDate(meeting.meeting_date, 'short')
				),
				html,
				text,
			})
			if (sendError) {
				// Release the claim so tomorrow's run tries again
				await db
					.from('prayer_reminders')
					.delete()
					.match({ meeting_id: meeting.id, leader_user_id: leaderId, kind })
				console.error('[prayer] send reminder', sendError)
				continue
			}

			sent.push(`${meeting.meeting_date} ${kind}`)
		} catch (e) {
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
		const db = getSupabaseAdmin()
		const { data, error } = await db.auth.admin.getUserById(
			meeting.leaderUserId
		)
		const user = data?.user
		if (error || !user?.email) {
			console.warn('[prayer] no email for leader', meeting.leaderUserId, error)
			return false
		}
		const displayName =
			typeof user.user_metadata?.display_name === 'string'
				? user.user_metadata.display_name.trim()
				: ''

		const date = formatMeetingDate(meeting.meetingDate)
		const { html, text } = await renderEmail(PrayerAssignmentEmail, {
			name: displayName || meeting.leaderName || 'there',
			date,
			previousDate: meeting.previousDate
				? formatMeetingDate(meeting.previousDate)
				: '',
			scripture: meeting.scripture ?? '',
			scheduleUrl: `${SITE_URL}/ministries/prayer`,
		})
		const short = formatMeetingDate(meeting.meetingDate, 'short')
		const { error: sendError } = await getResend().emails.send({
			from: `Freedom in Christ Church <${getResendFromEmail()}>`,
			to: user.email,
			subject: meeting.previousDate
				? `Your prayer meeting devotional moved to ${short}`
				: `You're leading the prayer meeting devotional on ${short}`,
			html,
			text,
		})
		if (sendError) {
			console.error('[prayer] send assignment', sendError)
			return false
		}
		return true
	} catch (e) {
		console.error('[prayer] notify assignment', e)
		return false
	}
}
