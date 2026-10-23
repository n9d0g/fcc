import { sundayMinistries } from '#lib/server/content.js'
import {
	updatedDataFiltered,
	setCacheHeaders,
	CACHE_PRESETS,
} from '#lib/utils.js'

export const load = async ({ setHeaders, url }) => {
	// Cache sunday ministries for 10 minutes, allow stale for 1 hour (bust=true to bypass)
	setCacheHeaders(setHeaders, url, ...CACHE_PRESETS.short)

	const data = await sundayMinistries()
	return {
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
			'Hall Set Up',
			'Ushers / Greeters',
		],
	}
}
