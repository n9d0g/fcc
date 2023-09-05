import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.women,
	]

	return {
		title: "FCC Women's Ministry.",
		breadcrumb: breadcrumb,
		headData: headData.ministriesWomen,
	}
}
