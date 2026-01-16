import { client, headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.ya,
	]

	const gallery = await client.fetch(`*[_type == "page-gallery" && pageUrl == "/ministries/young-adults"][0]{
		title,
		photos[]{
			"url": asset->url,
			alt,
			caption
		}
	}`)

	return {
		title: "FCC Young Adults' Ministry.",
		breadcrumb: breadcrumb,
		headData: headData.ministriesYA,
		gallery,
	}
}
