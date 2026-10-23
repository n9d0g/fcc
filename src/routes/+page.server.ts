import { links } from '#lib/config/index.js'
import { loadPublishedPosts } from '#lib/server/blog.js'
import { sermons } from '#lib/server/content.js'
import { setCacheHeaders, CACHE_PRESETS, sortByField } from '#lib/utils.js'
import { error } from '@sveltejs/kit'

export const load = async (event) => {
	// Cache home page for 5 minutes, allow stale for 1 hour (bust=true to bypass)
	setCacheHeaders(event.setHeaders, event.url, ...CACHE_PRESETS.home)

	const [allSermons, posts] = await Promise.all([
		sermons(),
		// The blog section is optional, so a failure just hides it
		loadPublishedPosts(event, 3).catch((err) => {
			console.error('[home] load blog posts', err)
			return []
		}),
	])

	if (allSermons)
		return {
			posts,
			sermons: sortByField(allSermons, 'date', 'desc'),
			links: { googleMaps: links.googleMaps, zoom: links.zoom.link },
		}

	throw error(500, 'Internal Server Error')
}
