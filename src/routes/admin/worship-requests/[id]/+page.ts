import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async ({ data }) => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.admin.worshipRequests,
		{
			title: data.request.full_name,
			href: `/admin/worship-requests/${data.request.id}`,
		},
	]

	return {
		...data,
		title: 'Review Request.',
		breadcrumb,
		headData: headData.worshipRequests,
	}
}
