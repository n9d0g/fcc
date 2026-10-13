import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async ({ data }) => {
	return {
		...data,
		title: 'Write for the Blog.',
		breadcrumb: [breadcrumbs.home, breadcrumbs.blog, breadcrumbs.blog.write],
		headData: headData.blogWrite,
	}
}
