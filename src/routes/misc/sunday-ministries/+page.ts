import { headData } from '$lib/constants'

export const load = async () => {
	return {
		headData: headData.sundayMinistries,
		tableHeaders: [
			"Date",
			"Presider",
			"Worship Service Invites",
			"Opening Prayer",
			"Closing Prayer",
			"Offering Ushers",
			"PowerPoint",
			"Crawlers & Toddlers",
			"SS Young Kids Grades 1-3",
			"SS Older Kids Grades 4-6",
			"Communion Presider",
			"Coffee/Breakfast",
			"Counters",
			"Set Up / Ushers",
			"Sermon Topics",
		]
	}
}
