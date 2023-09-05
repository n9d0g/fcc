import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.youth,
	]

	return {
		title: "FCC Youth's Ministry.",
		breadcrumb: breadcrumb,
		headData: headData.ministriesYouth,
	}
}
