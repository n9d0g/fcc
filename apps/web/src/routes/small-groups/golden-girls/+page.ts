import { headData, breadcrumbs, links, fetchPageGallery } from '$lib/config'
import { setCacheHeaders, CACHE_PRESETS } from '$lib/utils'

export const load = async ({ setHeaders, url }) => {
	// Cache for 1 hour, allow stale for 24 hours (bust=true to bypass)
	setCacheHeaders(setHeaders, url, ...CACHE_PRESETS.long)

	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.smallgroups,
		breadcrumbs.smallgroups.goldenGirls,
	]

	const gallery = await fetchPageGallery('/small-groups/golden-girls')

	return {
		title: 'Golden Girls.',
		breadcrumb: breadcrumb,
		headData: headData.smallgroupsGoldenGirls,
		gallery,
		links,
	}
}
