import { SANITY_WEBHOOK_SECRET } from '$app/env/private'
import type { FccEvent } from '#lib/events.js'
import { announceEvent } from '#lib/server/event-subscribers.js'
import { hasBearer } from '#lib/server/bearer.js'
import { json } from '@sveltejs/kit'

// Called by the "New event" Sanity webhook (sanity.io/manage → API →
// Webhooks) when an event is created. It sends the event as JSON with an
// "Authorization: Bearer <SANITY_WEBHOOK_SECRET>" header. Subscribers are
// emailed about upcoming events only, and only once per event.

export const POST = async ({ request }) => {
	if (!SANITY_WEBHOOK_SECRET) {
		console.error('[sanity webhook] SANITY_WEBHOOK_SECRET is not set')
		return json({ error: 'Not configured' }, { status: 500 })
	}
	if (!hasBearer(request, SANITY_WEBHOOK_SECRET)) {
		return json({ error: 'Unauthorized' }, { status: 401 })
	}

	let event: FccEvent
	try {
		event = await request.json()
	} catch {
		return json({ error: 'Invalid JSON' }, { status: 400 })
	}

	if (!event?._id || !event.title || !event.start) {
		return json({ error: 'Missing _id, title or start' }, { status: 400 })
	}
	if (event._id.startsWith('drafts.')) {
		return json({ skipped: 'draft' })
	}
	if (new Date(event.start) < new Date()) {
		return json({ skipped: 'past event' })
	}

	try {
		const sent = await announceEvent(event)
		return sent === null
			? json({ skipped: 'already announced' })
			: json({ sent })
	} catch (e) {
		console.error('[sanity webhook] announce', e)
		// 500 makes Sanity retry later
		return json({ error: 'Could not send the announcement' }, { status: 500 })
	}
}
