import { headData, breadcrumbs, links, fetchPageGallery } from '$lib/config'
import { setCacheHeaders, CACHE_PRESETS } from '$lib/utils'

export const load = async ({ setHeaders, url }) => {
	// Cache for 1 hour, allow stale for 24 hours (bust=true to bypass)
	setCacheHeaders(setHeaders, url, ...CACHE_PRESETS.long)

	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.smallgroups,
		breadcrumbs.smallgroups.womenChasingGod,
	]

	const gallery = await fetchPageGallery('/small-groups/women-chasing-god')

	return {
		title: 'FCC Women Chasing God Small Group.',
		breadcrumb: breadcrumb,
		headData: headData.smallgroupsWCG,
		gallery,
		links,
	}
}
