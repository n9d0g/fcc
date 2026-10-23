import { pageFor } from '#lib/config/pages.js'

export const load = async ({ data }) => ({
	...data,
	pageMeta: pageFor('/admin/worship-requests/[id]', {
		label: data.request.full_name,
	}),
})
