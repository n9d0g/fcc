import { confirmSubscription } from '#lib/server/event-subscribers.js'
import type { PageServerLoad } from './$types'

// Opened from the link in the confirmation email
export const load: PageServerLoad = async ({ url }) => {
	const token = url.searchParams.get('token') ?? ''
	if (!token) return { confirmed: false }

	try {
		return { confirmed: await confirmSubscription(token) }
	} catch (e) {
		console.error('[events] confirm subscription', e)
		return { confirmed: false }
	}
}
