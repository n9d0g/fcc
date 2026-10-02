import { client, links } from '$lib/config'
import { setCacheHeaders, CACHE_PRESETS, sortByField } from '$lib/utils'
import { error } from '@sveltejs/kit'

export const load = async ({ setHeaders, url }) => {
	// Cache home page for 5 minutes, allow stale for 1 hour (bust=true to bypass)
	setCacheHeaders(setHeaders, url, ...CACHE_PRESETS.home)

	const [sermons, pages] = await Promise.all([
		client.fetch(`*[_type == "sermons"]`),
		client.fetch(`*[_type == "pages"] {
			page,
			'invite': weeklyInvite.asset->url 
		}`),
	])

	if (sermons && pages)
		return {
			sermons: sortByField(sermons, 'date', 'desc'),
			pages: pages[0],
			links: { googleMaps: links.googleMaps, zoom: links.zoom.link },
		}

	throw error(500, 'Internal Server Error')
}
