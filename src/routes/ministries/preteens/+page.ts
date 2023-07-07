import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [breadcrumbs.home, breadcrumbs.ministries, breadcrumbs.ministries.preteens]

	return {
		title: "FCC Pre-teen's Ministry.",
		breadcrumb: breadcrumb,
		headData: headData.ministriesPreteens,
	}
}
