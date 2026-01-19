import { client, headData, breadcrumbs, links } from '$lib/constants'
import { setCacheHeaders } from '$lib/utils'

export const load = async ({ setHeaders, url }) => {
	// Cache for 1 hour, allow stale for 24 hours (bust=true to bypass)
	setCacheHeaders(setHeaders, url, 3600, 86400)

	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.smallgroups,
		breadcrumbs.smallgroups.bramptonWomens2,
	]

	const gallery = await client.fetch(`*[_type == "page-gallery" && pageUrl == "/small-groups/brampton-womens-2"][0]{
		title,
		photos[]{
			"url": asset->url,
			alt,
			caption
		}
	}`)

	return {
		title: "Brampton Women's Bible Study 2.",
		breadcrumb: breadcrumb,
		headData: headData.smallgroupsBramptonWomens2,
		gallery,
		links,
	}
}
