import { SITE_URL } from '#lib/config/index.js'
import { PAGES, type PageEntry, type PageId } from '#lib/config/pages.js'

// Indexed static pages from the registry; blog posts are added below
const pages = Object.entries(PAGES as Record<PageId, PageEntry>)
	.filter(([id, entry]) => entry.indexed !== false && !id.includes('['))
	.map(([id, entry]) => ({
		path: id,
		priority: (entry.priority ?? 0.6).toFixed(1),
	}))

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
			({ path, priority }) =>
				`<url><loc>${SITE_URL}${path}</loc><priority>${priority}</priority></url>`
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
