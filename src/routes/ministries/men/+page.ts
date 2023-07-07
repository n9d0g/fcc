import { headData } from '$lib/constants'
import { breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [breadcrumbs.home, breadcrumbs.ministries, breadcrumbs.ministries.men]

	return {
		title: "FCC Men's Ministry.",
		breadcrumb: breadcrumb,
		headData: headData.ministriesMen,
	}
}
