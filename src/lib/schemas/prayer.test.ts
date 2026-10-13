import { describe, expect, it } from 'vitest'
import {
	daysBetween,
	reminderDue,
	upcomingWednesdays,
	type ReminderKind,
} from './prayer.js'

const none = new Set<ReminderKind>()

describe('reminderDue', () => {
	it('sends each reminder in its window', () => {
		expect(reminderDue(14, none)).toBe('two_weeks')
		expect(reminderDue(7, none)).toBe('one_week')
		expect(reminderDue(0, none)).toBe('day_of')
		expect(reminderDue(15, none)).toBeNull()
		expect(reminderDue(-1, none)).toBeNull()
	})

	it('catches up after a missed run, but never repeats', () => {
		expect(reminderDue(12, none)).toBe('two_weeks')
		expect(reminderDue(12, new Set(['two_weeks']))).toBeNull()
		expect(reminderDue(5, new Set(['two_weeks']))).toBe('one_week')
		expect(reminderDue(5, new Set(['one_week']))).toBeNull()
	})

	it('skips the two-week reminder for late assignments', () => {
		expect(reminderDue(3, none)).toBe('one_week')
	})
})

describe('dates', () => {
	it('counts days across months and DST', () => {
		expect(daysBetween('2026-10-28', '2026-11-11')).toBe(14)
		expect(daysBetween('2026-10-28', '2026-10-28')).toBe(0)
	})

	it('lists Wednesdays starting today if it is one', () => {
		expect(upcomingWednesdays('2026-10-28', 2)).toEqual([
			'2026-10-28',
			'2026-11-04',
		])
		expect(upcomingWednesdays('2026-10-29', 1)).toEqual(['2026-11-04'])
	})
})
