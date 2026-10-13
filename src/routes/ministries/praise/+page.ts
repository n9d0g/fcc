import { headData, breadcrumbs, fetchPageGallery } from '#lib/config/index.js'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.praise,
	]

	const gallery = await fetchPageGallery('/ministries/praise')

	return {
		title: 'Praise & Worship Ministry.',
		breadcrumb: breadcrumb,
		headData: headData.praise,
		gallery,
		landingPageItems: [
			{
				title: 'Schedule',
				link: '/ministries/praise/schedule',
				description: 'Who is serving each Sunday.',
				icon: 'lucide:calendar-days',
			},
			{
				title: 'My Availability',
				link: '/ministries/praise/availability',
				description: "Block out Sundays you can't serve.",
				icon: 'lucide:calendar-x',
			},
			{
				title: 'Song Usage',
				link: '/ministries/praise/song-usage',
				description: 'How often we sing each song.',
				icon: 'lucide:list-music',
			},
			{
				title: 'Worship Director Notes',
				link: 'https://n9d0g.notion.site/worship-director-notes-2cc49c91f89280d5b0a9f6ecd67ea167?source=copy_link',
				description: 'Notes and resources on Notion.',
				icon: 'lucide:notebook-pen',
				external: true,
			},
		],
	}
}
