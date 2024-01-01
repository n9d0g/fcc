import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.sundaySchool,
		breadcrumbs.sundaySchool.toddler,
	]

	return {
		title: 'Toddler Class.',
		breadcrumb: breadcrumb,
		headData: headData.programming,
		landingPageItems: [
			{
				title: 'Toddler Class (ages 0-5)',
				link: '/sunday-school/toddler',
			},
			{
				title: 'Primary Class (ages 6-8)',
				link: '/sunday-school/primary',
			},
			{
				title: 'Junior Class (ages 9-12)',
				link: '/sunday-school/junior',
			},
		],
	}
}
