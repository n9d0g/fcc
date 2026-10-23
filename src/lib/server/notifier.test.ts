import { beforeEach, describe, expect, it } from 'vite-plus/test'
import ContactAutoReply from '#lib/emails/ContactAutoReply.svelte'
import NewEvent from '#lib/emails/NewEvent.svelte'
import { blank, send, sendEach, trySend, useOutbox } from './notifier.js'

const autoReply = {
	subject: 'Thanks',
	template: ContactAutoReply,
	props: { name: 'Jane' },
}

describe('send and trySend', () => {
	let outbox: ReturnType<typeof useOutbox>
	beforeEach(() => {
		outbox = useOutbox({
			people: { superusers: ['a@x.ca', 'b@x.ca'], worshipLeaders: ['w@x.ca'] },
			fail: (email) => email.to.includes('down@x.ca'),
		})
	})

	it('resolves named recipients', async () => {
		await send({ ...autoReply, to: 'superusers', bcc: { inbox: 'requests' } })
		await send({ ...autoReply, to: 'worshipLeaders' })
		await send({ ...autoReply, to: { inbox: 'contact' }, replyTo: 'jane@x.ca' })

		expect(outbox.sent.map((e) => [e.to, e.bcc ?? []])).toEqual([
			[['a@x.ca', 'b@x.ca'], [outbox.inboxes.requests]],
			[['w@x.ca'], []],
			[[outbox.inboxes.contact], []],
		])
		expect(outbox.sent[2].replyTo).toBe('jane@x.ca')
		expect(outbox.sent[0].html).toContain('Jane')
	})

	it('throws from send but not from trySend when delivery fails', async () => {
		await expect(send({ ...autoReply, to: 'down@x.ca' })).rejects.toThrow()
		expect(await trySend({ ...autoReply, to: 'down@x.ca' })).toBe(false)
		expect(await trySend({ ...autoReply, to: 'up@x.ca' })).toBe(true)
	})

	it('treats nobody to send to as a failure', async () => {
		useOutbox({ people: { superusers: [] } })
		await expect(send({ ...autoReply, to: 'superusers' })).rejects.toThrow(
			/Nobody/
		)
	})
})

describe('sendEach', () => {
	const event = (recipients: string[]) =>
		sendEach({
			subject: 'New event',
			template: NewEvent,
			props: {
				title: 'Picnic',
				icon: '',
				day: 'Sat',
				time: 'Noon',
				location: 'Park',
				description: '',
				detailsUrl: 'https://fcccanada.ca/events',
				googleUrl: '',
				outlookUrl: '',
				icsUrl: '',
				unsubscribeUrl: `https://fcccanada.ca/u?token=${blank('TOKEN')}`,
				address: '',
			},
			recipients: recipients.map((to, i) => ({ to, fill: { TOKEN: `t${i}` } })),
		})

	it('personalises each copy and batches by 100', async () => {
		const outbox = useOutbox()
		const people = Array.from({ length: 150 }, (_, i) => `p${i}@x.ca`)
		expect(await event(people)).toBe(150)
		expect(outbox.sent).toHaveLength(150)
		expect(outbox.sent[7].html).toContain('token=t7')
		expect(outbox.sent[7].html).not.toContain(blank('TOKEN'))
	})

	it('reports a partial send instead of throwing', async () => {
		// The second batch (people 100+) fails
		useOutbox({ fail: (email) => email.to[0] === 'p120@x.ca' })
		const people = Array.from({ length: 150 }, (_, i) => `p${i}@x.ca`)
		expect(await event(people)).toBe(100)
	})

	it('throws when nobody got it', async () => {
		useOutbox({ fail: () => true })
		await expect(event(['a@x.ca'])).rejects.toThrow()
	})
})
