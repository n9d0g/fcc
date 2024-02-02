import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const gridData = [
		{
			title: 'Young Adults',
			link: '/small-groups/young-adults',
			backgroundImage: '/images/serviceImage.jpg',
			icon: '/images/service-icon.png',
		},
		{
			title: 'Women Chasing God',
			link: '/small-groups/women-chasing-god',
			backgroundImage: '/images/serviceImage.jpg',
			icon: '/images/service-icon.png',
		},
		{
			title: 'University Bible Study',
			link: '/small-groups/university-bible-study',
			backgroundImage: '/images/serviceImage.jpg',
			icon: '/images/service-icon.png',
		},
		{
			title: 'South Mississauga',
			link: '/small-groups/south-mississauga',
			backgroundImage: '/images/serviceImage.jpg',
			icon: '/images/service-icon.png',
		},
		{
			title: 'Partners in Prayer Bible Study',
			link: '/small-groups/partners-in-prayer',
			backgroundImage: '/images/serviceImage.jpg',
			icon: '/images/service-icon.png',
		},
		{
			title: 'Macasaquit Bible Study',
			link: '/small-groups/macasaquit-bible-study',
			backgroundImage: '/images/serviceImage.jpg',
			icon: '/images/service-icon.png',
		},
	]

	const breadcrumb = [breadcrumbs.home, breadcrumbs.smallgroups]

	return {
		title: 'Our Small Groups.',
		breadcrumb: breadcrumb,
		headData: headData.smallgroups,
		landingPageItems: gridData,
	}
}
