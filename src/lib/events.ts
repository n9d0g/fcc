import { SITE_URL, church } from '#lib/config/seo.js'

// An event from Sanity (apps/cms/schemas/event.ts)
export type FccEvent = {
	_id: string
	title: string
	icon?: string | null
	start: string
	end?: string | null
	location?: string | null
	description?: string | null
	link?: string | null
}

// GROQ projection shared by the events page, the .ics route and the webhook
export const EVENT_FIELDS =
	'_id, title, icon, start, end, location, description, link'

const TIME_ZONE = 'America/Toronto'
const DEFAULT_LENGTH_MS = 2 * 60 * 60 * 1000

/** End time, defaulting to two hours after the start. */
export const eventEnd = (event: Pick<FccEvent, 'start' | 'end'>) =>
	event.end ??
	new Date(new Date(event.start).getTime() + DEFAULT_LENGTH_MS).toISOString()

export const churchAddress = () => {
	const { street, city, region, postalCode } = church.address
	return `${street}, ${city}, ${region} ${postalCode}`
}

/** The event's location, or the church when none is set. */
export const eventLocation = (event: Pick<FccEvent, 'location'>) =>
	event.location?.trim() || `Freedom in Christ Church, ${churchAddress()}`

/** Absolute URL for an event's link field ("/events/..." or "https://..."). */
export const eventUrl = (event: Pick<FccEvent, 'link'>) => {
	const link = event.link?.trim()
	if (!link) return null
	if (link.startsWith('/')) return `${SITE_URL}${link}`
	return /^https?:\/\//.test(link) ? link : null
}

/** "Sunday, October 18, 2026" in Toronto time. */
export const formatEventDay = (iso: string) =>
	new Date(iso).toLocaleDateString('en-CA', {
		timeZone: TIME_ZONE,
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	})

const formatTime = (iso: string) =>
	new Date(iso).toLocaleTimeString('en-CA', {
		timeZone: TIME_ZONE,
		hour: 'numeric',
		minute: '2-digit',
	})

/** "10:30 a.m. – 12:30 p.m.", or just the start when there's no end time. */
export const formatEventTime = (event: Pick<FccEvent, 'start' | 'end'>) =>
	event.end
		? `${formatTime(event.start)} – ${formatTime(event.end)}`
		: formatTime(event.start)

/** Splits events into upcoming (soonest first) and past (latest first). */
export const splitEvents = (events: FccEvent[], now = new Date()) => {
	const upcoming: FccEvent[] = []
	const past: FccEvent[] = []
	for (const event of events) {
		;(new Date(eventEnd(event)) >= now ? upcoming : past).push(event)
	}
	upcoming.sort((a, b) => a.start.localeCompare(b.start))
	past.sort((a, b) => b.start.localeCompare(a.start))
	return { upcoming, past }
}

// 2026-10-18T14:30:00.000Z -> 20261018T143000Z
const calendarStamp = (iso: string) =>
	new Date(iso)
		.toISOString()
		.replace(/[-:]/g, '')
		.replace(/\.\d{3}/, '')

/** Description for calendar invites: the event text plus a link back. */
const calendarDetails = (event: FccEvent) =>
	[event.description?.trim(), eventUrl(event) ?? `${SITE_URL}/events`]
		.filter(Boolean)
		.join('\n\n')

export const googleCalendarUrl = (event: FccEvent) =>
	`https://calendar.google.com/calendar/render?${new URLSearchParams({
		action: 'TEMPLATE',
		text: event.title,
		dates: `${calendarStamp(event.start)}/${calendarStamp(eventEnd(event))}`,
		details: calendarDetails(event),
		location: eventLocation(event),
		ctz: TIME_ZONE,
	})}`

export const outlookCalendarUrl = (event: FccEvent) =>
	`https://outlook.live.com/calendar/0/action/compose?${new URLSearchParams({
		path: '/calendar/action/compose',
		rru: 'addevent',
		subject: event.title,
		startdt: new Date(event.start).toISOString(),
		enddt: new Date(eventEnd(event)).toISOString(),
		body: calendarDetails(event),
		location: eventLocation(event),
	})}`

/** Link to the .ics download, for Apple Calendar and everything else. */
export const icsUrl = (event: Pick<FccEvent, '_id'>) =>
	`${SITE_URL}/events/calendar/${encodeURIComponent(event._id)}`

// RFC 5545 text escaping: backslash, semicolon and comma get a backslash in
// front, and newlines become a literal \n
const BACKSLASH = String.fromCharCode(92)
const icsText = (value: string) =>
	value
		.replace(/[\\;,]/g, (char) => BACKSLASH + char)
		.replace(/\r?\n/g, BACKSLASH + 'n')

// RFC 5545 lines are at most 75 octets; continuation lines start with a space.
// Splits on whole characters so multi-byte emoji are never cut in half.
const foldLine = (line: string) => {
	const encoder = new TextEncoder()
	const parts: string[] = []
	let current = ''
	let bytes = 0
	for (const char of line) {
		const size = encoder.encode(char).length
		const limit = parts.length ? 74 : 75
		if (bytes + size > limit) {
			parts.push(current)
			current = ''
			bytes = 0
		}
		current += char
		bytes += size
	}
	parts.push(current)
	return parts.join('\r\n ')
}

/** A single-event iCalendar file. */
export const eventIcs = (event: FccEvent, now = new Date()) =>
	[
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//Freedom in Christ Church//Events//EN',
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		'BEGIN:VEVENT',
		`UID:${event._id}@fcccanada.ca`,
		`DTSTAMP:${calendarStamp(now.toISOString())}`,
		`DTSTART:${calendarStamp(event.start)}`,
		`DTEND:${calendarStamp(eventEnd(event))}`,
		`SUMMARY:${icsText(event.title)}`,
		`DESCRIPTION:${icsText(calendarDetails(event))}`,
		`LOCATION:${icsText(eventLocation(event))}`,
		`URL:${eventUrl(event) ?? `${SITE_URL}/events`}`,
		'END:VEVENT',
		'END:VCALENDAR',
	]
		.map(foldLine)
		.join('\r\n') + '\r\n'
