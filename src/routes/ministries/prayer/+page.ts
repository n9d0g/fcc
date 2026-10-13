import { headData, breadcrumbs, fetchPageGallery } from '#lib/config/index.js'

export const load = async ({ data }) => {
	const gallery = await fetchPageGallery('/ministries/prayer')

	return {
		...data,
		title: 'FCC Prayer Ministry.',
		breadcrumb: [
			breadcrumbs.home,
			breadcrumbs.ministries,
			breadcrumbs.ministries.prayer,
		],
		headData: headData.ministriesPrayer,
		gallery: gallery ?? undefined,
	}
}
