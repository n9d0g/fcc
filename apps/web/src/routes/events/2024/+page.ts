import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.events,
		breadcrumbs.events['2024'],
	]

	return {
		title: 'FCC 2024 Events',
		breadcrumb: breadcrumb,
		headData: headData.events,
	}
}
