import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.smallgroups,
		breadcrumbs.smallgroups.ya,
	]

	return {
		title: 'FCC Young Adults Small Group.',
		breadcrumb: breadcrumb,
		headData: headData.smallgroupsYA,
		landingPageItems: [
			{
				title: 'YA Men',
				link: '/small-groups/young-adults/men',
			},
			{
				title: 'YA Women',
				link: '/small-groups/young-adults/women',
			},
		],
	}
}
