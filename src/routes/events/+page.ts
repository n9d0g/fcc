import { headData, breadcrumbs, links } from '#lib/config/index.js'

export const load = async () => {
	const breadcrumb = [breadcrumbs.home, breadcrumbs.events]

	return {
		title: 'FCC Events.',
		breadcrumb: breadcrumb,
		headData: headData.events,
		calendarLink: links.calendar,
	}
}
