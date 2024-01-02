import { headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [breadcrumbs.home, breadcrumbs.sundaySchool.teachers]

	return {
		title: 'Sunday School Teachers Page',
		breadcrumb: breadcrumb,
		headData: headData.sundaySchool.teachers,
		landingPageItems: [
			{
				title: 'Toddler Class (ages 0-5)',
				link: '/ss-teachers/toddler',
			},
			{
				title: 'Primary Class (ages 6-8)',
				link: '/ss-teachers/primary',
			},
			{
				title: 'Junior Class (ages 9-12)',
				link: '/ss-teachers/junior',
			},
		],
	}
}
