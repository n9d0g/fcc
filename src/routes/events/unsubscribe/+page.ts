import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async ({ data }) => ({
	...data,
	title: 'Unsubscribe.',
	breadcrumb: [breadcrumbs.home, breadcrumbs.events],
	headData: headData.eventSubscription,
})
