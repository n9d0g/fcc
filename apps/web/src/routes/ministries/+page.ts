import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [breadcrumbs.home, breadcrumbs.ministries]

	return {
		title: 'Ministries.',
		breadcrumb: breadcrumb,
		headData: headData.ministries,
		landingPageItems: [
			{
				title: 'Praise & Worship',
				link: '/ministries/praise',
			},
			{
				title: 'Prayer',
				link: '/ministries/prayer',
			},
			{
				title: 'Sunday Service Ministries',
				link: '/ministries/sunday-ministries',
			},
			{
				title: 'Sunday School',
				link: '/ministries/sunday-school',
			},
			{
				title: 'Men',
				link: '/ministries/men',
			},
			{
				title: 'Women',
				link: '/ministries/women',
			},
			{
				title: 'Youth',
				link: '/ministries/youth',
			},
			{
				title: 'Young Adults',
				link: '/ministries/young-adults',
			},
		],
	}
}
