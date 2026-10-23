import { SITE_URL } from '#lib/config/index.js'
import { PAGES, type PageEntry, type PageId } from '#lib/config/pages.js'

// Unlisted pages from the registry, as the shortest prefixes that cover them
// (/blog/write also covers /blog/write/[id]), plus endpoints that aren't pages
const disallowed = [
	...new Set(
		Object.entries(PAGES as Record<PageId, PageEntry>)
			.filter(([, entry]) => entry.indexed === false)
			.map(([id]) => id.split('/[')[0])
	),
]
	.sort()
	.filter(
		(path, _, all) => !all.some((p) => p !== path && path.startsWith(`${p}/`))
	)
	.concat('/auth/', '/api/')

// Only the production domain is indexed; dev.fcccanada.ca and workers.dev
// previews would otherwise compete with it as duplicate content
export const GET = ({ url }) => {
	const production = [SITE_URL, SITE_URL.replace('//', '//www.')].includes(
		url.origin
	)

	const body = production
		? [
				'User-agent: *',
				...disallowed.map((path) => `Disallow: ${path}`),
				'',
				`Sitemap: ${SITE_URL}/sitemap.xml`,
			]
		: ['User-agent: *', 'Disallow: /']

	return new Response(body.join('\n') + '\n', {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'public, max-age=3600',
		},
	})
}
