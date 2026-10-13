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
			!path.startsWith('/blog/write') &&
			![
				'/login',
				'/account',
				'/ministries/praise/availability',
				'/ministries/praise/song-usage',
			].includes(path)
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

export const GET = async ({ locals }) => {
	// Published blog posts; the static pages still go out if this fails
	const { data: posts, error } = await locals.supabase
		.from('blog_posts')
		.select('slug, updated_at')
		.eq('status', 'published')
		.returns<{ slug: string; updated_at: string }[]>()
	if (error) console.error('[sitemap] load blog posts', error)

	const urls = [
		...pages.map(
			(path) =>
				`<url><loc>${SITE_URL}${path}</loc><priority>${priority(path)}</priority></url>`
		),
		...(posts ?? []).map(
			(post) =>
				`<url><loc>${SITE_URL}/blog/${post.slug}</loc><lastmod>${post.updated_at.slice(0, 10)}</lastmod><priority>0.6</priority></url>`
		),
	].join('')

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
