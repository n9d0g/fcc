import { headData, breadcrumbs } from '#lib/config/index.js'
import bibleStudy from '#lib/assets/community/bible-study.jpg'
import womenMinistry from '#lib/assets/community/women-ministry.jpg'
import menGathering from '#lib/assets/ministries/men/men-img2.jpg'

export const load = async () => {
	return {
		title: 'About FCC.',
		headData: headData.about,
		breadcrumb: [breadcrumbs.home, breadcrumbs.about],
		landingPageItems: [
			{
				title: 'Beliefs',
				link: '/about/beliefs',
				description: 'Our core values and statement of faith.',
				icon: 'lucide:book-open',
				image: bibleStudy,
			},
			{
				title: 'Mission & Vision',
				link: '/about/mission-vision',
				description: 'Why we exist and where we are going.',
				icon: 'lucide:compass',
				image: womenMinistry,
			},
			{
				title: 'Leadership',
				link: '/about/leadership',
				description: 'Meet the people who serve and shepherd FCC.',
				icon: 'lucide:users',
				image: menGathering,
			},
		],
	}
}
