import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.smallgroups,
		breadcrumbs.smallgroups.southMississauga,
	]

	return {
		title: 'South Mississauga Small Group.',
		breadcrumb: breadcrumb,
		headData: headData.smallgroupsSouthMississauga,
	}
}
