import { links, headData, breadcrumbs } from '#lib/config/index.js'

export const load = async () => {
	const breadcrumb = [breadcrumbs.home, breadcrumbs.give]

	return {
		title: 'Generosity is a form of Worship.',
		breadcrumb: breadcrumb,
		links: {
			verse1: links.giveVerse1,
			verse2: links.giveVerse2,
			googleMaps: links.googleMaps,
			etransfer: links.etransfer,
		},
		headData: headData.give,
	}
}
