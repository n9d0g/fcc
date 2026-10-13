import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async ({ data }) => {
	const breadcrumb = [breadcrumbs.home, breadcrumbs.admin.worshipRequests]

	return {
		...data,
		title: 'Worship Team Requests.',
		breadcrumb,
		headData: headData.worshipRequests,
	}
}
