import { headData } from '$lib/constants'

export const load = async () => {
	return {
		headData: headData.praise,
		landingPageItems: [
			{
				title: "Schedule",
				link: "/ministries/praise/schedule"
			}
		]
	}
}
