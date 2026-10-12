import { describe, expect, it } from 'vitest'
import { renderEmail } from './render.server.js'
import ContactSubmission from './ContactSubmission.svelte'

describe('ContactSubmission email', () => {
	it('renders inlined html and plain text with escaped user input', async () => {
		const { html, text } = await renderEmail(ContactSubmission, {
			name: 'Jane <script>alert(1)</script>',
			email: 'jane@example.com',
			message: 'Hello\nI would like to visit on Sunday.',
			submittedAt: 'Oct 12, 2026, 10:00 a.m.',
		})

		// Tailwind classes are inlined as styles (brand colour from customCSS)
		expect(html).toContain('background-color:rgb(14, 165, 233)')
		expect(html).not.toContain('class="')
		expect(html).not.toContain('<script>alert(1)</script>')
		expect(html).toContain('&lt;script&gt;')
		expect(html).toContain('mailto:jane@example.com')
		expect(text).toMatch(/Hello\nI would like to visit on Sunday\./)
		expect(text).toContain('jane@example.com')
	})
})
