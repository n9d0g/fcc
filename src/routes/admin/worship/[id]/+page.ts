import { headData, breadcrumbs } from '#lib/config/index.js'
import { formatSunday } from '#lib/schemas/worship-availability.js'

export const load = async ({ data }) => ({
	...data,
	title: `${formatSunday(data.service.service_date)}.`,
	breadcrumb: [
		breadcrumbs.home,
		breadcrumbs.admin.worship,
		{ title: formatSunday(data.service.service_date), href: '' },
	],
	headData: headData.worshipSchedule,
})
