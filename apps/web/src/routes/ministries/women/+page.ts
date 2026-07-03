import { headData, breadcrumbs, fetchPageGallery } from '$lib/config'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.women,
	]

	const gallery = await fetchPageGallery('/ministries/women')

	return {
		title: "FCC Women's Ministry.",
		breadcrumb: breadcrumb,
		headData: headData.ministriesWomen,
		gallery,
	}
}
