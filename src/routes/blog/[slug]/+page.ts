import { headData, breadcrumbs } from '#lib/config/index.js'
import { postExcerpt } from '#lib/schemas/blog.js'

export const load = async ({ data }) => {
	const { post } = data

	return {
		...data,
		title: post.title,
		breadcrumb: [
			breadcrumbs.home,
			breadcrumbs.blog,
			{ title: post.title, href: `/blog/${post.slug}` },
		],
		headData: {
			title: `${post.title} | ${headData.blog.title}`,
			description: postExcerpt(post, 155),
		},
	}
}
