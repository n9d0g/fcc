import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [breadcrumbs.home, breadcrumbs.ministries]

	return {
		title: 'Ministries',
		breadcrumb: breadcrumb,
		headData: headData.ministries,
		landingPageItems: [
			{
				title: 'Sunday School',
				link: '/ministries/sunday-school',
				backgroundImage: '/images/schoolImage.jpg',
				icon: '/images/book-icon.png',
			},
			{
				title: 'Praise & Worship',
				link: '/ministries/praise',
				icon: '/images/praise-icon.png',
				backgroundImage: '/images/praiseImage.jpg',
			},
			{
				title: 'Service Ministries',
				link: '/ministries/sunday-ministries',
				backgroundImage: '/images/serviceImage.jpg',
				icon: '/images/service-icon.png',
			},
			{
				title: 'Prayer',
				link: '/ministries/prayer',
				backgroundImage: '/images/prayerImage.jpg',
				icon: '/images/cross-icon.png',
			},

			{
				title: 'Men',
				link: '/ministries/men',
				icon: '/images/head-icon.png',
				backgroundImage: '/images/mensImage.jpg',
			},
			{
				title: 'Women',
				link: '/ministries/women',
				icon: '/images/female-icon.jpg',
				backgroundImage: '/images/womensImage.jpg',
			},
			{
				title: 'Youth',
				link: '/ministries/youth',
				icon: '/images/youth-icon.png',
				backgroundImage: '/images/youthImage.jpg',
			},
			{
				title: 'Young People',
				link: '/ministries/young-adults',
				icon: '/images/people-icon.png',
				backgroundImage: '/images/youngPeopleImage.jpg',
			},
		],
	}
}
