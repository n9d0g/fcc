import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async ({ data }) => ({
	...data,
	title: 'Prayer Schedule.',
	breadcrumb: [breadcrumbs.home, breadcrumbs.admin.prayer],
	headData: headData.prayerSchedule,
})
