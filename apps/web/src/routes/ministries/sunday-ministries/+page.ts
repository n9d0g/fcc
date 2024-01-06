import { client, headData, breadcrumbs } from '$lib/constants'
import { updatedDataFiltered } from '$lib/utils'

export const load = async () => {
	const data = await client.fetch(`*[_type == "sunday-ministries"]`)
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.sundayMinistries,
	]

	return {
		title: 'Sunday Ministries.',
		breadcrumb: breadcrumb,
		headData: headData.sundayMinistries,
		tBody: updatedDataFiltered(data, 'date'),
		tHeaders: [
			'Month',
			'Presider',
			'Worship Service Invites',
			'Opening Prayer',
			'Closing Prayer',
			'PowerPoint',
			'Crawlers & Toddlers',
			'SS Grades 1-3',
			'SS Grades 4-6',
			'Communion Presider',
			'Coffee/Breakfast',
			'Counters',
			'Set Up / Ushers',
		],
	}
}
