import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [breadcrumbs.home, breadcrumbs.register]

	return {
		title: 'Register',
		breadcrumb: breadcrumb,
		headData: headData.give,
	}
}
