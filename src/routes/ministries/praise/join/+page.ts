import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async ({ data }) => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.praise,
		breadcrumbs.ministries.praise.join,
	]

	return {
		...data,
		title: 'Join the Worship Team.',
		breadcrumb,
		headData: headData.praiseJoin,
	}
}
