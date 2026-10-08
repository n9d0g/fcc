import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async () => {
	const breadcrumb = [breadcrumbs.home, breadcrumbs.login]

	return {
		title: 'Log In',
		breadcrumb: breadcrumb,
		headData: headData.login,
	}
}
