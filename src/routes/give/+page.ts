import { links, headData, breadcrumbs } from '$lib/constants'

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
			pic1: 'https://images.unsplash.com/photo-1499652848871-1527a310b13a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
		},
		headData: headData.give,
	}
}
