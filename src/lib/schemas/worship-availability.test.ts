import { describe, expect, it } from 'vite-plus/test'
import { torontoToday, upcomingSundays } from './worship-availability.js'

describe('upcomingSundays', () => {
	it('starts on today when today is a Sunday', () => {
		expect(upcomingSundays('2026-10-18', 2)).toEqual([
			'2026-10-18',
			'2026-10-25',
		])
	})

	it('starts on the next Sunday mid-week', () => {
		expect(upcomingSundays('2026-10-13', 1)).toEqual(['2026-10-18'])
	})

	it('steps across DST and year boundaries a week at a time', () => {
		expect(upcomingSundays('2026-10-31', 4)).toEqual([
			'2026-11-01',
			'2026-11-08',
			'2026-11-15',
			'2026-11-22',
		])
		expect(upcomingSundays('2026-12-26', 2)).toEqual([
			'2026-12-27',
			'2027-01-03',
		])
	})
})

describe('torontoToday', () => {
	it('uses the Toronto date, not UTC', () => {
		// 02:00 UTC on the 19th is still the evening of the 18th in Toronto
		expect(torontoToday(new Date('2026-10-19T02:00:00Z'))).toBe('2026-10-18')
	})
})
