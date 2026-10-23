import { describe, expect, it } from 'vite-plus/test'
import { isRole } from './roles.js'

describe('isRole', () => {
	it('accepts known roles only', () => {
		expect(isRole('worship_leader')).toBe(true)
		expect(isRole('admin')).toBe(false)
	})
})
