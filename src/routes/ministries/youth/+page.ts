import { headData, breadcrumbs, fetchPageGallery } from '$lib/config'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.youth,
	]

	const gallery = await fetchPageGallery('/ministries/youth')

	return {
		title: "FCC Youth's Ministry.",
		breadcrumb: breadcrumb,
		headData: headData.ministriesYouth,
		gallery,
	}
}
