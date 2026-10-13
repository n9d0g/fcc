import { SITE_URL } from '#lib/config/index.js'

// Only the production domain is indexed; dev.fcccanada.ca and workers.dev
// previews would otherwise compete with it as duplicate content
export const GET = ({ url }) => {
	const production = [SITE_URL, SITE_URL.replace('//', '//www.')].includes(
		url.origin
	)

	const body = production
		? [
				'User-agent: *',
				'Disallow: /admin/',
				'Disallow: /login',
				'Disallow: /ministries/praise/availability',
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
