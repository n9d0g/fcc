import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.smallgroups,
		breadcrumbs.smallgroups.yumul,
	]

	return {
		title: 'FCC Partners in Prayer Bible Study Group.',
		breadcrumb: breadcrumb,
		headData: headData.smallgroupsYumul,
	}
}
