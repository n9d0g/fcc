import { headData, breadcrumbs, fetchPageGallery } from '#lib/config/index.js'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.ya,
	]

	const gallery = await fetchPageGallery('/ministries/young-adults')

	return {
		title: "FCC Young Adults' Ministry.",
		breadcrumb: breadcrumb,
		headData: headData.ministriesYA,
		gallery,
	}
}
