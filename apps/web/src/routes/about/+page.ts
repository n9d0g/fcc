import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	return {
		title: 'About FCC',
		headData: headData.about,
		breadcrumb: [breadcrumbs.home, breadcrumbs.about],
		landingPageItems: [
			{
				title: 'Beliefs',
				link: '/about/beliefs',
				icon: '/images/beliefs-icon.png',
				backgroundImage: '/images/beliefs-background.jpg',
			},
			{
				title: 'Mission & Vision',
				link: '/about/mission-vision',
				icon: '/images/mission-vision-icon.png',
				backgroundImage: '/images/mission-vision-background.jpg',
			},
			{
				title: 'Leadership',
				link: '/about/leadership',
				icon: '/images/leadership-icon.png',
				backgroundImage: '/images/leadership-background.jpg',
			},
		],
	}
}
