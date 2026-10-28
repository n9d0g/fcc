import { describe, expect, it } from 'vite-plus/test'
import { optional } from './content.js'

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
