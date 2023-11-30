import { headData, breadcrumbs, links } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.smallgroups,
		breadcrumbs.smallgroups.womenChasingGod,
	]

	return {
		title: 'FCC Women Chasing God Small Group.',
		breadcrumb: breadcrumb,
		headData: headData.smallgroupsWCG,
		links: links.wcg,
	}
}
