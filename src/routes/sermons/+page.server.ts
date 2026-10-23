import { sermons } from '#lib/server/content.js'
import { setCacheHeaders, CACHE_PRESETS, sortByField } from '#lib/utils.js'
import { error } from '@sveltejs/kit'

export const load = async ({ setHeaders, url }) => {
	const data = await sermons()

	// Cache sermons for 10 minutes, allow stale for 1 hour (bust=true to bypass)
	setCacheHeaders(setHeaders, url, ...CACHE_PRESETS.short)

	if (data)
		return {
			sermons: sortByField(data, 'date', 'desc'),
		}

	throw error(500, 'Internal Server Error')
}
