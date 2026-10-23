import { gallery as pageGallery } from '#lib/server/content.js'

export const load = async ({ url }) => {
	const gallery = await pageGallery(url.pathname)

	return {
		gallery,
	}
}
