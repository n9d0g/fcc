import { describe, expect, it } from 'vite-plus/test'
import { policyFor } from '#lib/server/access.js'
import { PAGES, pageFor, type PageEntry } from './pages.js'

const routeIds = Object.keys(import.meta.glob('/src/routes/**/+page.svelte'))
	.map(
		(file) =>
			file.replace('/src/routes', '').replace(/\/\+page\.svelte$/, '') || '/'
	)
	.sort()

const labels = (id: keyof typeof PAGES) =>
	pageFor(id).crumbs.map((c) => c.label)

describe('PAGES', () => {
	it('has exactly one entry per page route', () => {
		expect(Object.keys(PAGES).sort()).toEqual(routeIds)
	})

	it('keeps every gated page out of search', () => {
		const listed = Object.entries(PAGES as Record<string, PageEntry>)
			.filter(([id, entry]) => policyFor(id) && entry.indexed !== false)
			.map(([id]) => id)
		expect(listed).toEqual([])
	})
})

describe('pageFor', () => {
	it('builds crumbs from the path, Home first and the page last', () => {
		expect(labels('/small-groups/golden-girls')).toEqual([
			'Home',
			'Small Groups',
			'Golden Girls',
		])
		expect(pageFor('/').crumbs).toEqual([{ label: 'Home', href: '/' }])
	})

	it('skips levels without a page', () => {
		expect(labels('/events/2026/thanksgiving')).toEqual([
			'Home',
			'Events',
			'Thanksgiving 2026',
		])
		expect(labels('/admin/blog')).toEqual(['Home', 'Blog Approvals'])
	})

	it('lets dynamic pages name themselves', () => {
		const meta = pageFor('/blog/[slug]', {
			label: 'Easter',
			title: 'Easter | Blog',
		})
		expect(meta.crumbs.map((c) => c.label)).toEqual(['Home', 'Blog', 'Easter'])
		expect(meta.title).toBe('Easter | Blog')
		expect(meta.description).toBe(PAGES['/blog'].description)
	})

	it('marks unlisted pages', () => {
		expect(pageFor('/admin/users').indexed).toBe(false)
		expect(pageFor('/about').indexed).toBe(true)
	})
})
