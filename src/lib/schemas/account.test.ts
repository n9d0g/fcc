import { describe, expect, it } from 'vite-plus/test'
import { displayNameSchema } from './account.js'

const parse = (displayName: string) =>
	displayNameSchema.safeParse({ displayName })

describe('displayNameSchema', () => {
	it.each([
		"Mary-Jane O'Neil",
		'Mary-Jane O’Neil',
		'José',
		'J.R.',
		'Nathan Lardizabal',
		'Zoë',
		'李小龍',
		'Nathan Jr.',
	])('accepts %s', (name) => {
		expect(parse(name).success).toBe(true)
	})

	it.each([
		['junk symbols', '* * * test'],
		['a domain', 'myxa.cc'],
		['a URL', 'https://x.io'],
		['digits', 'Test123'],
		['only punctuation', "- . '"],
		['an empty name', '   '],
		['over 20 characters', 'Christopher Alexander'],
	])('rejects %s', (_, name) => {
		expect(parse(name).success).toBe(false)
	})

	it('trims before checking the length', () => {
		const result = parse('  Nathan Lardizabal  ')
		expect(result.success && result.data.displayName).toBe('Nathan Lardizabal')
	})

	it('explains the allowed characters', () => {
		const result = parse('Test123')
		expect(result.error?.issues[0]?.message).toBe(
			'Names can only use letters, spaces, hyphens, apostrophes and periods.'
		)
	})
})
