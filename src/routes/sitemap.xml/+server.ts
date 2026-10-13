import { SITE_URL } from '#lib/config/index.js'

// Every route with a page component; redirect-only routes (/av, /wd, ...)
// have just a +page.ts and are left out automatically
const pages = Object.keys(import.meta.glob('/src/routes/**/+page.svelte'))
	.map(
		(file) =>
			file.replace('/src/routes', '').replace(/\/\+page\.svelte$/, '') || '/'
	)
	// Private, signed-in or parameterised pages don't belong in search
	.filter(
		(path) =>
			!path.includes('[') &&
			!path.startsWith('/admin') &&
			!['/login', '/ministries/praise/availability'].includes(path)
	)
	.sort()

// Pages that matter most for "church in Mississauga" style searches
const priority = (path: string) =>
	path === '/'
		? '1.0'
		: [
					'/about',
					'/contact',
					'/ministries',
					'/small-groups',
					'/sermons',
			  ].includes(path)
			? '0.8'
			: '0.6'

export const GET = () => {
	const urls = pages
		.map(
			(path) =>
				`<url><loc>${SITE_URL}${path}</loc><priority>${priority(path)}</priority></url>`
		)
		.join('')

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
		{
			headers: {
				'content-type': 'application/xml; charset=utf-8',
				'cache-control': 'public, max-age=3600',
			},
		}
	)
}
