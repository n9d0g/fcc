import { pageFor } from '#lib/config/pages.js'
import { formatSunday } from '#lib/schemas/worship-availability.js'

export const load = async ({ data }) => ({
	...data,
	pageMeta: pageFor('/admin/worship/[id]', {
		label: formatSunday(data.service.service_date),
	}),
})
