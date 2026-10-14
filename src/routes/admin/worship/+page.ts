import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async ({ data }) => ({
	...data,
	title: 'Worship Schedule.',
	breadcrumb: [breadcrumbs.home, breadcrumbs.admin.worship],
	headData: headData.worshipSchedule,
})
