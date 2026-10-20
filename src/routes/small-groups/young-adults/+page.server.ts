import { headData, breadcrumbs, fetchPageGallery } from '#lib/config/index.js'
import { setCacheHeaders, CACHE_PRESETS } from '#lib/utils.js'

export const load = async ({ setHeaders, url }) => {
	// Cache for 1 hour, allow stale for 24 hours (bust=true to bypass)
	setCacheHeaders(setHeaders, url, ...CACHE_PRESETS.long)

	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.smallgroups,
		breadcrumbs.smallgroups.ya,
	]

	const gallery = await fetchPageGallery('/small-groups/young-adults')

	return {
		title: 'FCC Young Adults Small Group.',
		breadcrumb: breadcrumb,
		headData: headData.smallgroupsYA,
		gallery,
	}
}
