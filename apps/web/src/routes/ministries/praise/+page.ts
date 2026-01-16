import { client, headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.praise,
	]

	const gallery = await client.fetch(`*[_type == "page-gallery" && pageUrl == "/ministries/praise"][0]{
		title,
		photos[]{
			"url": asset->url,
			alt,
			caption
		}
	}`)

	return {
		title: 'Praise & Worship Ministry.',
		breadcrumb: breadcrumb,
		headData: headData.praise,
		gallery,
		landingPageItems: [
			{
				title: 'Schedule',
				link: '/ministries/praise/schedule',
			},
			{
				title: 'Song Usage',
				link: '/ministries/praise/song-usage',
			},
			{
				title: 'Worship Director Notes',
				link: 'https://n9d0g.notion.site/worship-director-notes-2cc49c91f89280d5b0a9f6ecd67ea167?source=copy_link',
				external: true,
			},
		],
	}
}
