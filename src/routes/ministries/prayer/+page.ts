import { headData, client, breadcrumbs, fetchPageGallery } from '$lib/config'
import { updatedDataFiltered, setCacheHeaders, CACHE_PRESETS } from '$lib/utils'
import { error } from '@sveltejs/kit'

export const load = async ({ setHeaders, url }) => {
	setCacheHeaders(setHeaders, url, ...CACHE_PRESETS.short)

	const [data, gallery] = await Promise.all([
		client.fetch(`
			*[_type == "prayer"] {
				name, date, scripture
			}
		`),
		fetchPageGallery('/ministries/prayer'),
	])

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
			gallery,
		}
	}
	throw error(500, 'Internal Server Error')
}
