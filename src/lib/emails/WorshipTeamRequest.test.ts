import { describe, expect, it } from 'vitest'
import { renderEmail } from './render.server.js'
import WorshipTeamRequest from './WorshipTeamRequest.svelte'

describe('WorshipTeamRequest email', () => {
	it('renders the request with escaped user input and a review link', async () => {
		const { html, text } = await renderEmail(WorshipTeamRequest, {
			fullName: 'Jane <script>alert(1)</script>',
			email: 'jane@example.com',
			roles: ['Vocals', 'Keys'],
			message: 'I play most Sundays\nat my old church.',
			reviewUrl: 'https://fcccanada.ca/admin/worship-requests',
			submittedAt: 'Oct 12, 2026, 10:00 a.m.',
		})

		expect(html).not.toContain('class="')
		expect(html).not.toContain('<script>alert(1)</script>')
		expect(html).toContain('&lt;script&gt;')
		expect(html).toContain('href="https://fcccanada.ca/admin/worship-requests"')
		expect(text).toContain('Vocals, Keys')
		expect(text).toMatch(/I play most Sundays\nat my old church\./)
	})

	it('omits the message section when there is no message', async () => {
		const { text } = await renderEmail(WorshipTeamRequest, {
			fullName: 'Jane',
			email: 'jane@example.com',
			roles: ['Drums'],
			message: '',
			reviewUrl: 'https://fcccanada.ca/admin/worship-requests',
			submittedAt: 'Oct 12, 2026, 10:00 a.m.',
		})

		expect(text).not.toMatch(/message/i)
	})
})
