import { client, headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.women,
	]

	const gallery = await client.fetch(`*[_type == "page-gallery" && pageUrl == "/ministries/women"][0]{
		title,
		photos[]{
			"url": asset->url,
			alt,
			caption
		}
	}`)

	return {
		title: "FCC Women's Ministry.",
		breadcrumb: breadcrumb,
		headData: headData.ministriesWomen,
		gallery,
	}
}
