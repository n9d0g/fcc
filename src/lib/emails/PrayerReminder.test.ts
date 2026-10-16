import { describe, expect, it } from 'vite-plus/test'
import { renderEmail } from './render.server.js'
import PrayerReminder from './PrayerReminder.svelte'

const base = {
	name: 'Jane <script>alert(1)</script>',
	date: 'Wednesday, October 28, 2026',
	scripture: 'Psalm 23',
	scheduleUrl: 'https://fcccanada.ca/ministries/prayer',
}

describe('PrayerReminder email', () => {
	it('counts down to the meeting and escapes the name', async () => {
		const { html, text } = await renderEmail(PrayerReminder, {
			...base,
			kind: 'two_weeks',
			daysUntil: 14,
		})
		expect(html).not.toContain('<script>alert(1)</script>')
		expect(text).toContain('in 14 days')
		expect(text).toContain('Psalm 23')
		expect(html).toContain('href="https://fcccanada.ca/ministries/prayer"')
	})

	it('says tomorrow and tonight', async () => {
		const tomorrow = await renderEmail(PrayerReminder, {
			...base,
			kind: 'one_week',
			daysUntil: 1,
		})
		expect(tomorrow.text).toContain('tomorrow')
		const tonight = await renderEmail(PrayerReminder, {
			...base,
			kind: 'day_of',
			daysUntil: 0,
			scripture: '',
		})
		expect(tonight.text).toMatch(/tonight/i)
		expect(tonight.text).not.toContain('Scripture')
	})
})
