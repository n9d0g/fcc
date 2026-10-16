import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async () => {
	const breadcrumb = [breadcrumbs.home, breadcrumbs.signup]

	return {
		title: 'Create an Account',
		breadcrumb: breadcrumb,
		headData: headData.signup,
	}
}
