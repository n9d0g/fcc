import { describe, expect, it } from 'vitest'
import type { User } from '@supabase/supabase-js'
import { hasRole, isRole } from './roles.js'

const user = (role?: string) =>
	({ id: 'u1', app_metadata: { role } }) as unknown as User

describe('hasRole', () => {
	it('lets superusers do everything', () => {
		expect(hasRole(user('admin'), [], 'prayer_leader')).toBe(true)
		expect(hasRole(user('admin'), undefined, 'worship_leader')).toBe(true)
	})

	it('only grants the roles a leader holds', () => {
		expect(hasRole(user(), ['prayer_leader'], 'prayer_leader')).toBe(true)
		expect(hasRole(user(), ['prayer_leader'], 'worship_leader')).toBe(false)
	})

	it('denies signed-out visitors', () => {
		expect(hasRole(null, ['prayer_leader'], 'prayer_leader')).toBe(false)
	})
})

describe('isRole', () => {
	it('accepts known roles only', () => {
		expect(isRole('worship_leader')).toBe(true)
		expect(isRole('admin')).toBe(false)
	})
})
