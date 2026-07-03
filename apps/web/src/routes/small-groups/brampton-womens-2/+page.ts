import { headData, breadcrumbs, links, fetchPageGallery } from '$lib/config'
import { setCacheHeaders, CACHE_PRESETS } from '$lib/utils'

export const load = async ({ setHeaders, url }) => {
	// Cache for 1 hour, allow stale for 24 hours (bust=true to bypass)
	setCacheHeaders(setHeaders, url, ...CACHE_PRESETS.long)

	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.smallgroups,
		breadcrumbs.smallgroups.bramptonWomens2,
	]

	const gallery = await fetchPageGallery('/small-groups/brampton-womens-2')

	return {
		title: "Brampton Women's Bible Study 2.",
		breadcrumb: breadcrumb,
		headData: headData.smallgroupsBramptonWomens2,
		gallery,
		links,
	}
}
