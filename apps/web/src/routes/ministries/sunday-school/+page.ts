import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.sundaySchool,
	]

	return {
		title: 'FCC Sunday School Ministry.',
		breadcrumb: breadcrumb,
		headData: headData.sundaySchool,
	}
}
