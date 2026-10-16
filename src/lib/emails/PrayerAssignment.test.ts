import { describe, expect, it } from 'vite-plus/test'
import { renderEmail } from './render.server.js'
import PrayerAssignment from './PrayerAssignment.svelte'

const base = {
	name: 'Jane <script>alert(1)</script>',
	date: 'Wednesday, October 28, 2026',
	scripture: 'Psalm 23',
	scheduleUrl: 'https://fcccanada.ca/ministries/prayer',
}

describe('PrayerAssignment email', () => {
	it('announces a new assignment with escaped input', async () => {
		const { html, text } = await renderEmail(PrayerAssignment, {
			...base,
			previousDate: '',
		})
		expect(html).not.toContain('<script>alert(1)</script>')
		expect(text).toContain('scheduled to lead the devotional')
		expect(text).toContain('Psalm 23')
		expect(text).not.toMatch(/moved/)
	})

	it('explains a date change', async () => {
		const { text } = await renderEmail(PrayerAssignment, {
			...base,
			previousDate: 'Wednesday, October 21, 2026',
		})
		expect(text).toMatch(/moved\s+from\s+Wednesday,\s+October\s+21,\s+2026/)
	})
})
