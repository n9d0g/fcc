import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async ({ data }) => {
	return {
		...data,
		title: 'Blog.',
		breadcrumb: [breadcrumbs.home, breadcrumbs.blog],
		headData: headData.blog,
	}
}
