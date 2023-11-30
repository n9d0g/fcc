import { headData, client, breadcrumbs } from '$lib/constants'
import { updatedDataFiltered } from '$lib/utils'

export const load = async () => {
	const data = await client.fetch(`
    *[_type == "prayer"] {
			name, date, scripture
    }
  `)

	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.prayer,
	]

	if (data) {
		return {
			title: 'FCC Prayer Ministry.',
			breadcrumb: breadcrumb,
			prayerData: updatedDataFiltered(data, 'date'),
			headData: headData.ministriesPrayer,
		}
	}
	return {
		status: 500,
		body: new Error('Internal Server Error'),
	}
}
