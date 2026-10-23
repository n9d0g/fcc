import { fetchPageGallery } from '#lib/config/index.js'

export const load = async () => {
	const gallery = await fetchPageGallery('/ministries/women')

	return {
		gallery,
	}
}
