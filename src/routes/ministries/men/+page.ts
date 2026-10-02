import { headData, breadcrumbs, fetchPageGallery } from '$lib/config'
import { setCacheHeaders, CACHE_PRESETS } from '$lib/utils'

export const load = async ({ setHeaders, url }) => {
	// Cache gallery for 1 hour, allow stale for 24 hours (bust=true to bypass)
	setCacheHeaders(setHeaders, url, ...CACHE_PRESETS.long)

	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.men,
	]

	const gallery = await fetchPageGallery('/ministries/men')

	return {
		title: "FCC Men's Ministry.",
		breadcrumb: breadcrumb,
		headData: headData.ministriesMen,
		gallery,
	}
}
