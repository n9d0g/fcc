import { headData, breadcrumbs, links } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries.programming,
		breadcrumbs.ministries.programming.details,
	]

	return {
		title: 'Programming Details.',
		breadcrumb: breadcrumb,
		headData: headData.programming,
		excelSheet: links.programming.details,
		attendance: links.programming.attendance,
	}
}
