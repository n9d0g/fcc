import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async ({ data }) => {
	return {
		...data,
		title: 'Blog Approvals.',
		breadcrumb: [breadcrumbs.home, breadcrumbs.admin.blog],
		headData: headData.blogApprovals,
	}
}
