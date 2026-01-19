import { client, headData, breadcrumbs } from '$lib/constants'

export const load = async ({ setHeaders }) => {
	// Cache gallery for 1 hour, allow stale for 24 hours while revalidating
	setHeaders({
		'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
	})

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
