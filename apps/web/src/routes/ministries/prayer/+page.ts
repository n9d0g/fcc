import { headData, client, breadcrumbs } from '$lib/constants'
import { updatedDataFiltered } from '$lib/utils'

export const load = async () => {
	const data = await client.fetch(`
    *[_type == "prayer"] {
			name, date, scripture
    }
  `)

	const gallery = await client.fetch(`*[_type == "page-gallery" && pageUrl == "/ministries/prayer"][0]{
		title,
		photos[]{
			"url": asset->url,
			alt,
			caption
		}
	}`)

	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.prayer,
	]

	if (data) {
		return {
			title: 'FCC Prayer Ministry.',
			breadcrumb: breadcrumb,
			prayerData: updatedDataFiltered(data, 'date'),
			headData: headData.ministriesPrayer,
			gallery,
		}
	}
	return {
		status: 500,
		body: new Error('Internal Server Error'),
	}
}
