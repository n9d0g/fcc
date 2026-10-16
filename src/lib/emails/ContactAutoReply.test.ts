import { describe, expect, it } from 'vite-plus/test'
import { renderEmail } from './render.server.js'
import ContactAutoReply from './ContactAutoReply.svelte'

describe('ContactAutoReply email', () => {
	it('greets the visitor by first name with escaped input', async () => {
		const { html, text } = await renderEmail(ContactAutoReply, {
			name: '  Jane <b>Doe</b> ',
		})

		expect(text).toContain('Hi Jane,')
		expect(html).not.toContain('<b>Doe</b>')
		expect(html).not.toContain('class="')
		expect(text).toContain('5225 Orbitor Dr')
	})
})
