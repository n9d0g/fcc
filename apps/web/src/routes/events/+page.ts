import { headData, breadcrumbs, links } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [breadcrumbs.home, breadcrumbs.events]

	return {
		title: 'FCC Events.',
		breadcrumb: breadcrumb,
		headData: headData.events,
		calendarLink: links.calendar,
	}
}
