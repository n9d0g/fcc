import { headData, breadcrumbs } from '$lib/config'

export const load = async () => {
	const breadcrumb = [breadcrumbs.home, breadcrumbs.login]

	return {
		title: 'Log In',
		breadcrumb: breadcrumb,
		headData: headData.login,
	}
}
