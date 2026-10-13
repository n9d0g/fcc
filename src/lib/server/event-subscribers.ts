import { SITE_URL } from '#lib/config/seo.js'
import { renderEmail } from '#lib/emails/render.server.js'
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
import { getResend, getResendFromEmail } from '#lib/resend.server.js'
import { getSupabaseAdmin } from '#lib/supabase/admin.server.js'

// Don't send another confirmation to the same address within this window,
// so the form can't be used to flood someone's inbox
const CONFIRM_THROTTLE_MS = 10 * 60 * 1000
// Resend's batch API takes at most 100 emails per call
const BATCH_SIZE = 100

const from = () => `Freedom in Christ Church <${getResendFromEmail()}>`

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

	const { html, text } = await renderEmail(EventSubscribeConfirmEmail, {
		confirmUrl: `${origin}/events/subscribe/confirm?token=${row.token}`,
	})
	const { error: sendError } = await getResend().emails.send({
		from: from(),
		to: email,
		subject: 'Confirm your FCC event updates',
		html,
		text,
	})
	if (sendError) throw new Error(sendError.message)
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

const TOKEN_PLACEHOLDER = '__UNSUBSCRIBE_TOKEN__'

/**
 * Emails every confirmed subscriber about a newly published event, once per
 * event. Returns how many people it was sent to, or null if this event was
 * already announced.
 */
export async function announceEvent(event: FccEvent) {
	const db = getSupabaseAdmin()

	// Claim the event first so a retried webhook can't send it twice
	const { error: claimError } = await db
		.from('event_announcements')
		.insert({ sanity_id: event._id, title: event.title })
	if (claimError) {
		// 23505: already announced
		if (claimError.code === '23505') return null
		throw claimError
	}

	let sent = 0
	try {
		const { data: subscribers, error } = await db
			.from('event_subscribers')
			.select('email, token')
			.not('confirmed_at', 'is', null)
			.is('unsubscribed_at', null)
			.returns<Pick<Subscriber, 'email' | 'token'>[]>()
		if (error) throw error
		if (!subscribers.length) return 0

		// Render once; each recipient only differs by their unsubscribe link
		const unsubscribeUrl = `${SITE_URL}/events/unsubscribe?token=${TOKEN_PLACEHOLDER}`
		const { html, text } = await renderEmail(NewEventEmail, {
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
			unsubscribeUrl,
			address: churchAddress(),
		})

		const emails = subscribers.map(({ email, token }) => {
			const personal = unsubscribeUrl.replace(TOKEN_PLACEHOLDER, token)
			return {
				from: from(),
				to: email,
				subject: `${event.icon ? `${event.icon} ` : ''}${event.title} · ${formatEventDay(event.start)}`,
				html: html.replaceAll(TOKEN_PLACEHOLDER, token),
				text: text.replaceAll(TOKEN_PLACEHOLDER, token),
				headers: { 'List-Unsubscribe': `<${personal}>` },
			}
		})

		for (let i = 0; i < emails.length; i += BATCH_SIZE) {
			const batch = emails.slice(i, i + BATCH_SIZE)
			const { error: sendError } = await getResend().batch.send(batch)
			if (sendError) {
				console.error('[events] announce batch failed', sendError)
				// Nothing went out yet: release the claim so Sanity's retry can try again
				if (sent === 0) throw new Error(sendError.message)
				continue
			}
			sent += batch.length
		}

		await db
			.from('event_announcements')
			.update({ recipients: sent })
			.eq('sanity_id', event._id)
		return sent
	} catch (e) {
		// Only release the claim if nobody got the email, so a retry can't
		// send it twice to the people who did
		if (sent === 0) {
			await db.from('event_announcements').delete().eq('sanity_id', event._id)
		}
		throw e
	}
}
