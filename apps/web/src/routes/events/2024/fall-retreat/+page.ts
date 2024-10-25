import { headData, breadcrumbs, links } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.events,
		breadcrumbs.events['2024'],
		breadcrumbs.events['2024'].fallRetreat,
	]

	return {
		title: 'FCC Fall Retreat 2024',
		breadcrumb: breadcrumb,
		headData: headData.events,
		calendarLink: links.calendar,
	}
}
