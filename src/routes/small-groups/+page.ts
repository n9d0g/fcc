import { headData, breadcrumbs } from '#lib/config/index.js'
import youngAdults from '#lib/assets/community/young-adults.jpg'

export const load = async () => {
	const gridData = [
		{
			title: 'Women Chasing God',
			link: '/small-groups/women-chasing-god',
			icon: 'lucide:globe',
		},
		{
			title: 'South Mississauga',
			link: '/small-groups/south-mississauga',
			icon: 'lucide:map-pin',
		},
		{
			title: "Brampton Women's Bible Study 1",
			link: '/small-groups/brampton-womens-1',
			icon: 'lucide:book-heart',
		},
		{
			title: "Brampton Women's Bible Study 2",
			link: '/small-groups/brampton-womens-2',
			icon: 'lucide:book-heart',
		},
		{
			title: 'Golden Girls',
			link: '/small-groups/golden-girls',
			icon: 'lucide:flower-2',
		},
		{
			title: 'Young Adults',
			link: '/small-groups/young-adults',
			icon: 'lucide:users',
			image: youngAdults,
		},
		{
			title: 'University Bible Study',
			link: '/small-groups/university-bible-study',
			icon: 'lucide:graduation-cap',
		},
		{
			title: 'Partners in Prayer Bible Study',
			link: '/small-groups/partners-in-prayer',
			icon: 'lucide:hand-heart',
		},
		{
			title: 'Macasaquit Bible Study',
			link: '/small-groups/macasaquit-bible-study',
			icon: 'lucide:home',
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
