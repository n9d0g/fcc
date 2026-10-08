import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.smallgroups,
		breadcrumbs.smallgroups.ubs,
	]

	return {
		title: 'FCC University Bible Study.',
		breadcrumb: breadcrumb,
		headData: headData.smallgroupsUBS,
	}
}
