import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async ({ data }) => ({
	...data,
	title: 'Users & Roles.',
	breadcrumb: [breadcrumbs.home, breadcrumbs.admin.users],
	headData: headData.userRoles,
})
