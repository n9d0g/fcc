import { describe, expect, it } from 'vitest'
import { renderEmail } from './render.server.js'
import BlogAuthorRequest from './BlogAuthorRequest.svelte'
import BlogPostSubmitted from './BlogPostSubmitted.svelte'

const evil = 'Jane <script>alert(1)</script>'

describe('BlogAuthorRequest email', () => {
	it('escapes user input and links to the review page', async () => {
		const { html, text } = await renderEmail(BlogAuthorRequest, {
			fullName: evil,
			email: 'jane@example.com',
			message: 'Devotionals\nand testimonies',
			reviewUrl: 'https://fcccanada.ca/admin/blog',
			submittedAt: 'Oct 14, 2026, 10:00 a.m.',
		})

		expect(html).not.toContain('class="')
		expect(html).not.toContain('<script>alert(1)</script>')
		expect(html).toContain('href="https://fcccanada.ca/admin/blog"')
		expect(text).toMatch(/Devotionals\nand testimonies/)
	})

	it('omits the message section when there is no message', async () => {
		const { text } = await renderEmail(BlogAuthorRequest, {
			fullName: 'Jane',
			email: 'jane@example.com',
			message: '',
			reviewUrl: 'https://fcccanada.ca/admin/blog',
			submittedAt: 'Oct 14, 2026, 10:00 a.m.',
		})

		expect(text).not.toMatch(/write about/i)
	})
})

describe('BlogPostSubmitted email', () => {
	it('escapes the title and links to the post preview', async () => {
		const { html, text } = await renderEmail(BlogPostSubmitted, {
			authorName: 'Jane',
			email: 'jane@example.com',
			title: evil,
			excerpt: 'A short summary',
			reviewUrl: 'https://fcccanada.ca/blog/grace-abcd',
			submittedAt: 'Oct 14, 2026, 10:00 a.m.',
		})

		expect(html).not.toContain('<script>alert(1)</script>')
		expect(html).toContain('href="https://fcccanada.ca/blog/grace-abcd"')
		expect(text).toContain('A short summary')
	})
})
