import { links } from '#lib/config/index.js'
import { loadPublishedPosts } from '#lib/server/blog.js'
import { optional, sermons } from '#lib/server/content.js'
import { setCacheHeaders, CACHE_PRESETS, sortByField } from '#lib/utils.js'

export const load = async (event) => {
	// Cache home page for 5 minutes, allow stale for 1 hour (bust=true to bypass)
	setCacheHeaders(event.setHeaders, event.url, ...CACHE_PRESETS.home)

	// The sermon and blog sections are optional, so a failure just hides them
	const [allSermons, posts] = await Promise.all([
		optional(sermons(), 'sermons'),
		loadPublishedPosts(event, 3).catch((err) => {
			console.error('[home] load blog posts', err)
			return []
		}),
	])

	return {
		posts,
		sermons: sortByField(allSermons ?? [], 'date', 'desc'),
		links: { googleMaps: links.googleMaps, zoom: links.zoom.link },
	}
}
