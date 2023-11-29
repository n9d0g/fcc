import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [breadcrumbs.home, breadcrumbs.ministries.programming]

	return {
		title: 'Programming Ministry.',
		breadcrumb: breadcrumb,
		headData: headData.programming,
		landingPageItems: [
			{
				title: 'Details',
				link: '/programming/details',
			},
		],
	}
}
