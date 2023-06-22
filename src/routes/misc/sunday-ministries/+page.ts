import { headData } from '$lib/constants'

export const load = async () => {
	return {
		headData: headData.sundayMinistries,
	}
}
