import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async () => {
	return {
		title: 'Thanksgiving 2026',
		breadcrumb: [
			breadcrumbs.home,
			breadcrumbs.events,
			breadcrumbs.events.thanksgiving2026,
		],
		headData: headData.thanksgiving2026,
	}
}
