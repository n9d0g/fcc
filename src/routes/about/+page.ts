import { headData } from '$lib/constants'
	import { breadcrumbs } from '$lib/constants'

export const load = async () => {
	return {
		title: "About FCC.",
		headData: headData.about,
		breadcrumb: [breadcrumbs.home, breadcrumbs.about],
		landingPageItems: [
			{
				title: "Beliefs",
				link: "/about/beliefs"
			},
			{
				title: "Mission & Vision",
				link: "/about/mission-vision"
			},
			{
				title: "Leadership",
				link: "/about/leadership"
			},
		]
	}
}
