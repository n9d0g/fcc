import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async ({ data }) => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.praise,
		breadcrumbs.ministries.praise.availability,
	]

	return {
		...data,
		title: 'My Availability.',
		breadcrumb,
		headData: headData.praiseAvailability,
	}
}
