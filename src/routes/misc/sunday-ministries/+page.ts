import { client, headData } from '$lib/constants'
import { updatedDataFiltered } from '$lib/utils'

export const load = async () => {
	const data = await client.fetch(`*[_type == "sunday-ministries"]`)

	return {
		headData: headData.sundayMinistries,
		tableBody: updatedDataFiltered(data, 'date'), 
		tableHeaders: [
			'Date',
			'Presider',
			'Worship Service Invites',
			'Opening Prayer',
			'Closing Prayer',
			'Offering Ushers',
			'PowerPoint',
			'Crawlers & Toddlers',
			'SS Young Kids Grades 1-3',
			'SS Older Kids Grades 4-6',
			'Communion Presider',
			'Coffee/Breakfast',
			'Counters',
			'Set Up / Ushers',
		],
	}
}
