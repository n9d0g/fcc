import { headData } from '$lib/constants'

export const load = async () => {
	return {
		headData: headData.ministries,
		landingPageItems: [
			{
				title: "Praise & Worship",
				link: "/ministries/praise"
			},
			{
				title: "Prayer",
				link: "/ministries/prayer"
			},
			{
				title: "Sunday Service Ministries",
				link: "/ministries/sunday-ministries"
			},
			{
				title: "Men",
				link: "/ministries/men"
			},
			{
				title: "Women",
				link: "/ministries/women"
			},
			{
				title: "Pre-teens",
				link: "/ministries/preteens"
			},
			{
				title: "Youth",
				link: "/ministries/youth"
			},
			{
				title: "Young Adults",
				link: "/ministries/young-adults"
			},
		]
	}
}
