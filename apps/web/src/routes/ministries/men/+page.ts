import { client, headData, breadcrumbs } from '$lib/constants'
import { setCacheHeaders } from '$lib/utils'

export const load = async ({ setHeaders, url }) => {
	// Cache gallery for 1 hour, allow stale for 24 hours (bust=true to bypass)
	setCacheHeaders(setHeaders, url, 3600, 86400)

	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.men,
	]

	const gallery = await client.fetch(`*[_type == "page-gallery" && pageUrl == "/ministries/men"][0]{
		title,
		photos[]{
			"url": asset->url,
			alt,
			caption
		}
	}`)

	return {
		title: "FCC Men's Ministry.",
		breadcrumb: breadcrumb,
		headData: headData.ministriesMen,
		gallery,
	}
}
