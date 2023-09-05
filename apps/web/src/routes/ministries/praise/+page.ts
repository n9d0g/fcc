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
		],
	}
}
