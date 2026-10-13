import { describe, expect, it } from 'vitest'
import { parseBody, postExcerpt, readingMinutes, slugify } from './blog.js'

describe('slugify', () => {
	it('builds a url-safe slug with the given suffix', () => {
		expect(slugify('Hello, World! Café time', 'abcd')).toBe(
			'hello-world-cafe-time-abcd'
		)
	})

	it('falls back to the suffix for titles with no letters', () => {
		expect(slugify('!!!', 'abcd')).toBe('abcd')
	})

	it('adds a random suffix by default', () => {
		expect(slugify('Grace')).toMatch(/^grace-[a-z0-9]{4}$/)
	})
})

describe('parseBody', () => {
	it('splits paragraphs, headings and lists', () => {
		const body =
			'## Intro\nFirst line\nsecond line\n\n- one\n- two\n\r\nLast <b>bit</b>'
		expect(parseBody(body)).toEqual([
			{ type: 'heading', text: 'Intro' },
			{ type: 'paragraph', lines: ['First line', 'second line'] },
			{ type: 'list', items: ['one', 'two'] },
			{ type: 'paragraph', lines: ['Last <b>bit</b>'] },
		])
	})
})

describe('postExcerpt', () => {
	it('prefers the written summary', () => {
		expect(postExcerpt({ excerpt: 'Summary', body: 'Body' })).toBe('Summary')
	})

	it('trims the body at a word boundary', () => {
		expect(
			postExcerpt({ excerpt: '', body: '## Title\n\nalpha beta gamma' }, 12)
		).toBe('alpha beta…')
	})
})

describe('readingMinutes', () => {
	it('is at least one minute', () => {
		expect(readingMinutes('short')).toBe(1)
		expect(readingMinutes('word '.repeat(600))).toBe(3)
	})
})
