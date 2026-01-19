import { client, headData, breadcrumbs } from '$lib/constants'
import { setCacheHeaders } from '$lib/utils'

export const load = async ({ setHeaders, url }) => {
	// Cache for 1 hour, allow stale for 24 hours (bust=true to bypass)
	setCacheHeaders(setHeaders, url, 3600, 86400)

	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.smallgroups,
		breadcrumbs.smallgroups.ya,
	]

	const gallery = await client.fetch(`*[_type == "page-gallery" && pageUrl == "/small-groups/young-adults"][0]{
		title,
		photos[]{
			"url": asset->url,
			alt,
			caption
		}
	}`)

	return {
		title: 'FCC Young Adults Small Group.',
		breadcrumb: breadcrumb,
		headData: headData.smallgroupsYA,
		gallery,
	}
}
