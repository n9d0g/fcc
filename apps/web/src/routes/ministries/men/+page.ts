import { client, headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
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
