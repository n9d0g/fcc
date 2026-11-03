import { describe, expect, it } from 'vite-plus/test'
import { optional, retryOnServerError } from './content.js'

describe('optional', () => {
	it('passes the content through when the query succeeds', async () => {
		const reported: string[] = []
		const report = (_err: unknown, label: string) => reported.push(label)

		expect(await optional(Promise.resolve(['a']), 'banner', report)).toEqual([
			'a',
		])
		expect(reported).toEqual([])
	})

	it('leaves the content out and reports it when the query fails', async () => {
		const reported: [unknown, string][] = []
		const report = (err: unknown, label: string) => reported.push([err, label])
		const down = new Error('HTTP 520')

		expect(await optional(Promise.reject(down), 'banner', report)).toBeNull()
		expect(reported).toEqual([[down, 'banner']])
	})
})

describe('retryOnServerError', () => {
	const httpError = (statusCode: number) =>
		Object.assign(new Error(`HTTP ${statusCode}`), { statusCode })
	const noWait = async () => {}

	const failingThen = <T>(errors: unknown[], value: T) => {
		let calls = 0
		const request = async () => {
			calls++
			const err = errors.shift()
			if (err) throw err
			return value
		}
		return { request, calls: () => calls }
	}

	it('retries once after a 5xx and returns the second result', async () => {
		const { request, calls } = failingThen([httpError(520)], 'banner')

		expect(await retryOnServerError(request, noWait)).toBe('banner')
		expect(calls()).toBe(2)
	})

	it('reads the status from the response when the error has none', async () => {
		const err = Object.assign(new Error('down'), {
			response: { statusCode: 503 },
		})
		const { request, calls } = failingThen([err], 'banner')

		expect(await retryOnServerError(request, noWait)).toBe('banner')
		expect(calls()).toBe(2)
	})

	it('gives up after the one retry', async () => {
		const second = httpError(502)
		const { request, calls } = failingThen([httpError(520), second], 'banner')

		await expect(retryOnServerError(request, noWait)).rejects.toBe(second)
		expect(calls()).toBe(2)
	})

	it('does not retry a 4xx or an error without a status', async () => {
		for (const err of [httpError(400), new Error('bad query')]) {
			const { request, calls } = failingThen([err], 'banner')

			await expect(retryOnServerError(request, noWait)).rejects.toBe(err)
			expect(calls()).toBe(1)
		}
	})
})
