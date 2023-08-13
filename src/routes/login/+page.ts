import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [breadcrumbs.home, breadcrumbs.login]

	return {
		title: 'Log In',
		breadcrumb: breadcrumb,
		headData: headData.give,
	}
}
