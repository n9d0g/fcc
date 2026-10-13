import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async ({ data }) => ({
	...data,
	title: data.confirmed ? "You're subscribed." : 'Link expired.',
	breadcrumb: [breadcrumbs.home, breadcrumbs.events],
	headData: headData.eventSubscription,
})
