import { client, headData, breadcrumbs } from '$lib/constants'
import { updatedDataFiltered } from '$lib/utils'

export const load = async () => {
	const data = await client.fetch(`*[_type == "sunday-ministries"]`)
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.sundaySchool,
	]

	return {
		title: 'FCC Sunday School Ministry.',
		breadcrumb: breadcrumb,
		headData: headData.sundaySchool,
		tBody: updatedDataFiltered(data, 'date'),
		tHeaders: [
			'Month',
			'Crawlers & Toddlers',
			'SS Grades 1-3',
			'SS Grades 4-6',
		],
	}
}
