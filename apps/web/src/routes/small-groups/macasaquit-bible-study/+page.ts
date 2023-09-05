import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.smallgroups,
		breadcrumbs.smallgroups.macasaquit,
	]

	return {
		title: 'Macasaquit Bible Study.',
		breadcrumb: breadcrumb,
		headData: headData.smallgroupsMacasaquit,
	}
}
