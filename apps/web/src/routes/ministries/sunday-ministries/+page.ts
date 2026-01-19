import { client, headData, breadcrumbs } from '$lib/constants'
import { updatedDataFiltered } from '$lib/utils'

export const load = async ({ setHeaders }) => {
	// Cache sunday ministries for 10 minutes, allow stale for 1 hour while revalidating
	setHeaders({
		'cache-control': 'public, max-age=600, stale-while-revalidate=3600',
	})

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
			'Communion Presider',
			'Coffee/Breakfast',
			'Counters',
			'Set Up / Ushers',
		],
	}
}
