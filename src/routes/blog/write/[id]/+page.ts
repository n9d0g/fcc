import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async ({ data, params }) => {
	const title = data.post ? 'Edit Post.' : 'New Post.'

	return {
		...data,
		title,
		breadcrumb: [
			breadcrumbs.home,
			breadcrumbs.blog,
			breadcrumbs.blog.write,
			{ title: title.slice(0, -1), href: `/blog/write/${params.id}` },
		],
		headData: headData.blogWrite,
	}
}
