import { client, headData, breadcrumbs } from '$lib/config'
import { setCacheHeaders, CACHE_PRESETS, sortByField } from '$lib/utils'
import { error } from '@sveltejs/kit'

export const load = async ({ setHeaders, url }) => {
	const data = await client.fetch(`*[_type == "sermons"]`)
	const breadcrumb = [breadcrumbs.home, breadcrumbs.sermons]

	// Cache sermons for 10 minutes, allow stale for 1 hour (bust=true to bypass)
	setCacheHeaders(setHeaders, url, ...CACHE_PRESETS.short)

	if (data)
		return {
			title: 'Sermons.',
			breadcrumb: breadcrumb,
			sermons: sortByField(data, 'date', 'desc'),
			headData: headData.sermons,
		}

	throw error(500, 'Internal Server Error')
}
