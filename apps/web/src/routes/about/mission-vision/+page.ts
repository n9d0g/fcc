import { headData, breadcrumbs, missionVision } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.about,
		breadcrumbs.about.missionVision,
	]

	return {
		title: 'Our Mission & Vision.',
		breadcrumb: breadcrumb,
		missionVision: missionVision,
		headData: headData.missionVision,
	}
}
