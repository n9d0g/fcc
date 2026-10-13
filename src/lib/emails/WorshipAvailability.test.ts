import { describe, expect, it } from 'vitest'
import { renderEmail } from './render.server.js'
import WorshipAvailability from './WorshipAvailability.svelte'

const base = {
	fullName: 'Jane <script>alert(1)</script>',
	email: 'jane@example.com',
	reviewUrl: 'https://fcccanada.ca/admin/availability',
	updatedAt: 'Oct 13, 2026, 10:00 a.m.',
}

describe('WorshipAvailability email', () => {
	it('lists blocked and cleared Sundays with escaped user input', async () => {
		const { html, text } = await renderEmail(WorshipAvailability, {
			...base,
			unavailable: ['Sun, Oct 18, 2026', 'Sun, Oct 25, 2026'],
			available: ['Sun, Nov 1, 2026'],
		})

		expect(html).not.toContain('class="')
		expect(html).not.toContain('<script>alert(1)</script>')
		expect(html).toContain('&lt;script&gt;')
		expect(html).toContain('href="https://fcccanada.ca/admin/availability"')
		expect(text).toMatch(/Sun, Oct 18, 2026\nSun, Oct 25, 2026/)
		expect(text).toContain('Sun, Nov 1, 2026')
	})

	it('omits the "available again" section when nothing was cleared', async () => {
		const { text } = await renderEmail(WorshipAvailability, {
			...base,
			unavailable: ['Sun, Oct 18, 2026'],
			available: [],
		})

		expect(text).not.toMatch(/available again/i)
	})
})
