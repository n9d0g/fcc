import { SITE_URL } from '#lib/config/seo.js'
import EventSubscribeConfirmEmail from '#lib/emails/EventSubscribeConfirm.svelte'
import NewEventEmail from '#lib/emails/NewEvent.svelte'
import {
	churchAddress,
	eventLocation,
	eventUrl,
	formatEventDay,
	formatEventTime,
	googleCalendarUrl,
	icsUrl,
	outlookCalendarUrl,
	type FccEvent,
} from '#lib/events.js'
import { blank, send, sendEach } from '#lib/server/notifier.js'
import { sendOnce, type Ledger } from '#lib/server/send-once.js'
import { getSupabaseAdmin } from '#lib/supabase/admin.server.js'

// Don't send another confirmation to the same address within this window,
// so the form can't be used to flood someone's inbox
const CONFIRM_THROTTLE_MS = 10 * 60 * 1000
type Subscriber = {
	id: string
	email: string
	token: string
	confirm_sent_at: string | null
	confirmed_at: string | null
	unsubscribed_at: string | null
}

/**
 * Starts (or restarts) a subscription and emails a confirmation link. Already
 * confirmed subscribers are left alone, and the caller shows the same message
 * either way so the form doesn't reveal who is subscribed.
 */
export async function subscribe(email: string, origin: string) {
	const db = getSupabaseAdmin()

	const { data: existing, error } = await db
		.from('event_subscribers')
		.select('*')
		.eq('email', email)
		.maybeSingle<Subscriber>()
	if (error) throw error

	if (existing?.confirmed_at && !existing.unsubscribed_at) return

	if (
		existing?.confirm_sent_at &&
		Date.now() - new Date(existing.confirm_sent_at).getTime() <
			CONFIRM_THROTTLE_MS
	) {
		return
	}

	const now = new Date().toISOString()
	const { data: row, error: upsertError } = existing
		? await db
				.from('event_subscribers')
				.update({
					confirm_sent_at: now,
					confirmed_at: null,
					unsubscribed_at: null,
				})
				.eq('id', existing.id)
				.select('token')
				.single()
		: await db
				.from('event_subscribers')
				.insert({ email, confirm_sent_at: now })
				.select('token')
				.single()
	if (upsertError) throw upsertError

	await send({
		to: email,
		subject: 'Confirm your FCC event updates',
		template: EventSubscribeConfirmEmail,
		props: {
			confirmUrl: `${origin}/events/subscribe/confirm?token=${row.token}`,
		},
	})
}

/** Confirms a subscription from the emailed link. Returns false if the token is unknown. */
export async function confirmSubscription(token: string) {
	const { data, error } = await getSupabaseAdmin()
		.from('event_subscribers')
		.update({ confirmed_at: new Date().toISOString(), unsubscribed_at: null })
		.eq('token', token)
		.select('id')
	// 22P02: not a uuid
	if (error && error.code !== '22P02') throw error
	return !!data?.length
}

/** Looks up the subscriber an unsubscribe link belongs to. */
export async function findSubscriber(token: string) {
	const { data, error } = await getSupabaseAdmin()
		.from('event_subscribers')
		.select('email, unsubscribed_at')
		.eq('token', token)
		.maybeSingle<Pick<Subscriber, 'email' | 'unsubscribed_at'>>()
	if (error && error.code !== '22P02') throw error
	return data
}

export async function unsubscribe(token: string) {
	const { data, error } = await getSupabaseAdmin()
		.from('event_subscribers')
		.update({ unsubscribed_at: new Date().toISOString() })
		.eq('token', token)
		.select('id')
	if (error && error.code !== '22P02') throw error
	return !!data?.length
}

// One row per announced event; the primary key rejects a second claim
const announcementLedger = (
	db: ReturnType<typeof getSupabaseAdmin>
): Ledger<FccEvent> => ({
	async claim(event) {
		const { error } = await db
			.from('event_announcements')
			.insert({ sanity_id: event._id, title: event.title })
		// 23505: already announced
		if (error?.code === '23505') return false
		if (error) throw error
		return true
	},
	async release(event) {
		await db.from('event_announcements').delete().eq('sanity_id', event._id)
	},
	async record(event, recipients) {
		await db
			.from('event_announcements')
			.update({ recipients })
			.eq('sanity_id', event._id)
	},
})

/**
 * Emails every confirmed subscriber about a newly published event, once per
 * event. Returns how many people it was sent to, or null if this event was
 * already announced.
 */
export async function announceEvent(event: FccEvent) {
	const db = getSupabaseAdmin()

	return sendOnce(announcementLedger(db), event, async () => {
		const { data: subscribers, error } = await db
			.from('event_subscribers')
			.select('email, token')
			.not('confirmed_at', 'is', null)
			.is('unsubscribed_at', null)
			.returns<Pick<Subscriber, 'email' | 'token'>[]>()
		if (error) throw error
		if (!subscribers.length) return 0

		// Each recipient only differs by their unsubscribe link
		const unsubscribeUrl = (token: string) =>
			`${SITE_URL}/events/unsubscribe?token=${token}`
		return sendEach({
			subject: `${event.icon ? `${event.icon} ` : ''}${event.title} · ${formatEventDay(event.start)}`,
			template: NewEventEmail,
			props: {
				title: event.title,
				icon: event.icon ?? '',
				day: formatEventDay(event.start),
				time: formatEventTime(event),
				location: eventLocation(event),
				description: event.description?.trim() ?? '',
				detailsUrl: eventUrl(event) ?? `${SITE_URL}/events`,
				googleUrl: googleCalendarUrl(event),
				outlookUrl: outlookCalendarUrl(event),
				icsUrl: icsUrl(event),
				unsubscribeUrl: unsubscribeUrl(blank('TOKEN')),
				address: churchAddress(),
			},
			recipients: subscribers.map(({ email, token }) => ({
				to: email,
				fill: { TOKEN: token },
				headers: { 'List-Unsubscribe': `<${unsubscribeUrl(token)}>` },
			})),
		})
	})
}
