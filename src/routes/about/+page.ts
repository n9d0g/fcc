import { headData } from '$lib/constants'

export const load = async () => {
	return {
		headData: headData.about,
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
