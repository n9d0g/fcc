import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.ya,
	]

	return {
		title: "FCC Young Adults' Ministry.",
		breadcrumb: breadcrumb,
		headData: headData.ministriesYA,
	}
}
