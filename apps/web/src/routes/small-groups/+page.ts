import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const gridData = [
		{
			title: 'Women Chasing God',
			link: '/small-groups/women-chasing-god',
		},
		{
			title: 'South Mississauga',
			link: '/small-groups/south-mississauga',
		},
		{
			title: "Brampton Women's Bible Study 1",
			link: '/small-groups/brampton-womens-1',
		},
		{
			title: "Brampton Women's Bible Study 2",
			link: '/small-groups/brampton-womens-2',
		},
		{
			title: 'Golden Girls',
			link: '/small-groups/golden-girls',
		},
		{
			title: 'Young Adults',
			link: '/small-groups/young-adults',
		},
		{
			title: 'University Bible Study',
			link: '/small-groups/university-bible-study',
		},
		{
			title: 'Partners in Prayer Bible Study',
			link: '/small-groups/partners-in-prayer',
		},
		{
			title: 'Macasaquit Bible Study',
			link: '/small-groups/macasaquit-bible-study',
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
