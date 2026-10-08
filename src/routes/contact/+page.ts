import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async () => {
	const breadcrumb = [breadcrumbs.home, breadcrumbs.contact]

	return {
		title: 'Contact FCC.',
		breadcrumb: breadcrumb,
		headData: headData.contact,
	}
}
