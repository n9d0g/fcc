import { client, links } from '#lib/config/index.js'
import { loadPublishedPosts } from '#lib/server/blog.js'
import { setCacheHeaders, CACHE_PRESETS, sortByField } from '#lib/utils.js'
import { error } from '@sveltejs/kit'

export const load = async (event) => {
	// Cache home page for 5 minutes, allow stale for 1 hour (bust=true to bypass)
	setCacheHeaders(event.setHeaders, event.url, ...CACHE_PRESETS.home)

	const [sermons, pages, posts] = await Promise.all([
		client.fetch(`*[_type == "sermons"]`),
		client.fetch(`*[_type == "pages"] {
			page,
			'invite': weeklyInvite.asset->url
		}`),
		// The blog section is optional, so a failure just hides it
		loadPublishedPosts(event, 3).catch((err) => {
			console.error('[home] load blog posts', err)
			return []
		}),
	])

	if (sermons && pages)
		return {
			posts,
			sermons: sortByField(sermons, 'date', 'desc'),
			pages: pages[0],
			links: { googleMaps: links.googleMaps, zoom: links.zoom.link },
		}

	throw error(500, 'Internal Server Error')
}
