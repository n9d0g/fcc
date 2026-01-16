import { client, headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.youth,
	]

	const gallery = await client.fetch(`*[_type == "page-gallery" && pageUrl == "/ministries/youth"][0]{
		title,
		photos[]{
			"url": asset->url,
			alt,
			caption
		}
	}`)

	return {
		title: "FCC Youth's Ministry.",
		breadcrumb: breadcrumb,
		headData: headData.ministriesYouth,
		gallery,
	}
}
