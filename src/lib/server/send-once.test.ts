import { describe, expect, it } from 'vite-plus/test'
import { memoryLedger, sendOnce } from './send-once.js'

describe('sendOnce', () => {
	it('sends once, then reports it as already sent', async () => {
		const { ledger, claimed } = memoryLedger<string>()
		let deliveries = 0
		const deliver = async () => (++deliveries, 3)

		expect(await sendOnce(ledger, 'event:1', deliver)).toBe(3)
		expect(await sendOnce(ledger, 'event:1', deliver)).toBeNull()
		expect(deliveries).toBe(1)
		expect(claimed.get('event:1')).toBe(3)
	})

	it('lets only one of two overlapping runs deliver', async () => {
		const { ledger } = memoryLedger<string>()
		let deliveries = 0
		const deliver = async () => {
			deliveries++
			await new Promise((r) => setTimeout(r, 5))
			return 1
		}
		const results = await Promise.all([
			sendOnce(ledger, 'reminder', deliver),
			sendOnce(ledger, 'reminder', deliver),
		])
		expect(results.sort()).toEqual([1, null])
		expect(deliveries).toBe(1)
	})

	it('releases the claim when delivery fails, so a later run retries', async () => {
		const { ledger } = memoryLedger<string>()
		await expect(
			sendOnce(ledger, 'reminder', async () => {
				throw new Error('down')
			})
		).rejects.toThrow('down')
		expect(await sendOnce(ledger, 'reminder', async () => 1)).toBe(1)
	})

	it('keeps the claim after a partial delivery', async () => {
		const { ledger } = memoryLedger<string>()
		// deliver returns a count (not a throw) when some people got it
		expect(await sendOnce(ledger, 'event:2', async () => 40)).toBe(40)
		expect(await sendOnce(ledger, 'event:2', async () => 100)).toBeNull()
	})
})
