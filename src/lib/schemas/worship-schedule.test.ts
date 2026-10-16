import { describe, expect, it } from 'vite-plus/test'
import { splitNames } from './worship-schedule.js'

describe('splitNames', () => {
	it('splits the separators people typed in Sanity', () => {
		expect(splitNames('Ana, Ben & Cy')).toEqual(['Ana', 'Ben', 'Cy'])
		expect(splitNames('Ana / Ben and Cy; Di')).toEqual([
			'Ana',
			'Ben',
			'Cy',
			'Di',
		])
	})

	it("doesn't split names containing 'and'", () => {
		expect(splitNames('Sandra, Andy')).toEqual(['Sandra', 'Andy'])
	})

	it('returns nothing for a blank value', () => {
		expect(splitNames('  ')).toEqual([])
	})
})
