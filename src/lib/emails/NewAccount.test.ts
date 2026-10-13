import { describe, expect, it } from 'vitest'
import { renderEmail } from './render.server.js'
import NewAccount from './NewAccount.svelte'

describe('NewAccount email', () => {
	it('renders the new account with escaped user input', async () => {
		const { html, text } = await renderEmail(NewAccount, {
			displayName: 'Jane <script>alert(1)</script>',
			email: 'jane@example.com',
			registeredAt: 'Oct 13, 2026, 10:00 a.m.',
		})

		expect(html).not.toContain('class="')
		expect(html).not.toContain('<script>alert(1)</script>')
		expect(html).toContain('&lt;script&gt;')
		expect(html).toContain('href="mailto:jane@example.com"')
		expect(text).toContain('jane@example.com')
	})
})
