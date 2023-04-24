import { headData } from '$lib/constants'

export const load = async () => {
	const gridData = [
		{
			title: 'Young Adults',
			link: '/small-groups/young-adults',
		},
		{
			title: 'Women Chasing God',
			link: '/small-groups/women-chasing-god',
		},
		{
			title: 'University Bible Study',
			link: '/small-groups/university-bible-study',
		},
		{
			title: 'South Mississauga',
			link: '/small-groups/south-mississauga',
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

	return {
		headData: headData.smallgroups,
		gridData: gridData,
	}
}
