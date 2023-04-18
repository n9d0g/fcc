import { leaders, headData } from '$lib/constants'

export const load = () => {
	return {
		leaders: leaders,
		headData: headData.leadership,
	}
}
