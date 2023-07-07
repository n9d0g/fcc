import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.smallgroups,
		breadcrumbs.smallgroups.ya,
		breadcrumbs.smallgroups.ya.women,
	]

	return {
		title: "FCC Young Adults Women's Small Group.",
		breadcrumb: breadcrumb,
		headData: headData.smallgroupsYAWomen,
	}
}
