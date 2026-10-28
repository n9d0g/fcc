import { gallery as pageGallery, optional } from '#lib/server/content.js'
import { setCacheHeaders, CACHE_PRESETS } from '#lib/utils.js'

export const load = async ({ setHeaders, url }) => {
	// Cache gallery for 1 hour, allow stale for 24 hours (bust=true to bypass)
	setCacheHeaders(setHeaders, url, ...CACHE_PRESETS.long)

	const gallery = await optional(pageGallery(url.pathname), 'gallery')

	return {
		gallery,
	}
}
