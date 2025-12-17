import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.praise,
	]

	return {
		title: 'Praise & Worship Ministry.',
		breadcrumb: breadcrumb,
		headData: headData.praise,
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
