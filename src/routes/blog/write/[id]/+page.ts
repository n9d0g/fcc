import { pageFor } from '#lib/config/pages.js'

export const load = async ({ data }) => ({
	...data,
	pageMeta: pageFor('/blog/write/[id]', {
		label: data.post ? 'Edit Post' : 'New Post',
	}),
})
