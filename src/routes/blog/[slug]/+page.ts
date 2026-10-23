import { PAGES, pageFor } from '#lib/config/pages.js'
import { postExcerpt } from '#lib/schemas/blog.js'

export const load = async ({ data }) => {
	const { post } = data

	return {
		...data,
		pageMeta: pageFor('/blog/[slug]', {
			label: post.title,
			title: `${post.title} | ${PAGES['/blog'].title}`,
			description: postExcerpt(post, 155),
		}),
	}
}
