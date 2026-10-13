import { describe, expect, it } from 'vitest'
import {
	eventEnd,
	eventIcs,
	eventLocation,
	formatEventTime,
	googleCalendarUrl,
	outlookCalendarUrl,
	splitEvents,
	type FccEvent,
} from './events.js'

const event: FccEvent = {
	_id: 'abc123',
	title: 'Christmas Service; carols, too',
	icon: '🎄',
	start: '2026-12-20T15:30:00.000Z', // 10:30 a.m. Toronto
	end: null,
	location: null,
	description: 'Join us for carols.\nBring a friend!',
	link: '/events',
}

describe('event helpers', () => {
	it('defaults to a two hour event at the church', () => {
		expect(eventEnd(event)).toBe('2026-12-20T17:30:00.000Z')
		expect(eventLocation(event)).toContain('5225 Orbitor Drive')
		expect(formatEventTime(event)).toMatch(/10:30/)
	})

	it('splits upcoming and past events around now', () => {
		const past = { ...event, _id: 'old', start: '2026-01-04T15:30:00.000Z' }
		const { upcoming, past: done } = splitEvents(
			[event, past],
			new Date('2026-10-17')
		)
		expect(upcoming.map((e) => e._id)).toEqual(['abc123'])
		expect(done.map((e) => e._id)).toEqual(['old'])
	})

	it('builds Google and Outlook links with the description', () => {
		const google = new URL(googleCalendarUrl(event))
		expect(google.searchParams.get('dates')).toBe(
			'20261220T153000Z/20261220T173000Z'
		)
		expect(google.searchParams.get('details')).toContain('Bring a friend!')

		const outlook = new URL(outlookCalendarUrl(event))
		expect(outlook.searchParams.get('subject')).toBe(event.title)
		expect(outlook.searchParams.get('body')).toContain('Join us for carols.')
	})
})

describe('eventIcs', () => {
	const ics = eventIcs(event, new Date('2026-10-17T00:00:00Z'))

	it('is a valid single-event calendar with escaped text', () => {
		expect(ics.startsWith('BEGIN:VCALENDAR\r\n')).toBe(true)
		expect(ics).toContain('DTSTART:20261220T153000Z')
		expect(ics).toContain('DTEND:20261220T173000Z')
		expect(ics).toContain(String.raw`SUMMARY:Christmas Service\; carols\, too`)
		expect(ics).toContain(
			String.raw`DESCRIPTION:Join us for carols.\nBring a friend!`
		)
		expect(ics.endsWith('END:VCALENDAR\r\n')).toBe(true)
	})

	it('folds long lines to 75 octets', () => {
		const long = eventIcs({ ...event, description: '🙏 '.repeat(60) })
		for (const line of long.split('\r\n')) {
			expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75)
		}
	})
})
