import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async ({ data }) => {
	return {
		...data,
		title: 'Edit Profile.',
		breadcrumb: [breadcrumbs.home, breadcrumbs.account],
		headData: headData.account,
	}
}
