import { gallery as pageGallery, optional } from '#lib/server/content.js'

export const load = async ({ url }) => {
	const gallery = await optional(pageGallery(url.pathname), 'gallery')

	return {
		gallery,
	}
}
