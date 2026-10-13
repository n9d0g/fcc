import { describe, expect, it } from 'vitest'
import { BLOCKED_SENDERS, route } from './routes'

describe('email routes', () => {
	it('forwards hello@ to Nate, ignoring case and plus tags', () => {
		expect(route('hello@fcccanada.ca', 'a@b.com')).toEqual({
			action: 'forward',
			alias: 'hello',
			to: ['nate@njil.dev'],
		})
		expect(route('Hello+Events@FCCcanada.ca', 'a@b.com')).toMatchObject({
			action: 'forward',
			alias: 'hello',
		})
	})

	it('rejects unknown addresses', () => {
		expect(route('admin@fcccanada.ca', 'a@b.com')).toEqual({
			action: 'reject',
			reason: 'Address not found',
		})
	})

	it('rejects blocked senders and domains', () => {
		BLOCKED_SENDERS.push('spam@example.com', '@junk.test')
		try {
			expect(route('hello@fcccanada.ca', 'SPAM@example.com').action).toBe(
				'reject'
			)
			expect(route('hello@fcccanada.ca', 'anyone@junk.test').action).toBe(
				'reject'
			)
			expect(route('hello@fcccanada.ca', 'friend@example.com').action).toBe(
				'forward'
			)
		} finally {
			BLOCKED_SENDERS.length = 0
		}
	})
})
