import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async ({ data }) => {
	const breadcrumb = [breadcrumbs.home, breadcrumbs.admin.availability]

	return {
		...data,
		title: 'Team Availability.',
		breadcrumb,
		headData: headData.teamAvailability,
	}
}
