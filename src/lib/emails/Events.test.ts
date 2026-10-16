import { describe, expect, it } from 'vite-plus/test'
import { renderEmail } from './render.server.js'
import EventSubscribeConfirm from './EventSubscribeConfirm.svelte'
import NewEvent from './NewEvent.svelte'

describe('EventSubscribeConfirm email', () => {
	it('links to the confirm page', async () => {
		const { html } = await renderEmail(EventSubscribeConfirm, {
			confirmUrl: 'https://fcccanada.ca/events/subscribe/confirm?token=abc',
		})
		expect(html).not.toContain('class="')
		expect(html).toContain(
			'href="https://fcccanada.ca/events/subscribe/confirm?token=abc"'
		)
	})
})

describe('NewEvent email', () => {
	const props = {
		title: 'Carols <script>alert(1)</script>',
		icon: '🎄',
		day: 'Sunday, December 20, 2026',
		time: '10:30 a.m.',
		location: 'Freedom in Christ Church',
		description: 'Join us.\nBring a friend!',
		detailsUrl: 'https://fcccanada.ca/events',
		googleUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE',
		outlookUrl: 'https://outlook.live.com/calendar/0/action/compose',
		icsUrl: 'https://fcccanada.ca/events/calendar/abc',
		unsubscribeUrl: 'https://fcccanada.ca/events/unsubscribe?token=abc',
		address: '5225 Orbitor Drive, Unit 3, Mississauga, ON L4W 4Y8',
	}

	it('escapes the title and includes calendar and unsubscribe links', async () => {
		const { html, text } = await renderEmail(NewEvent, props)
		expect(html).not.toContain('<script>alert(1)</script>')
		expect(html).toContain('href="https://fcccanada.ca/events/calendar/abc"')
		expect(html).toContain(
			'href="https://fcccanada.ca/events/unsubscribe?token=abc"'
		)
		expect(text).toMatch(/Join us\.\nBring a friend!/)
		expect(text).toContain('5225 Orbitor Drive')
	})
})
