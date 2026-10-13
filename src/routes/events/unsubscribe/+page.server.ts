import { findSubscriber, unsubscribe } from '#lib/server/event-subscribers.js'
import { fail } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

// Hide most of the address: "jane@example.com" -> "j***@example.com"
const mask = (email: string) => email.replace(/^(.)[^@]*/, '$1***')

// Linked from every event email. Unsubscribing needs a button press, since
// some mail scanners open every link in an email
export const load: PageServerLoad = async ({ url }) => {
	const token = url.searchParams.get('token') ?? ''
	if (!token) return { token, email: null, alreadyUnsubscribed: false }

	try {
		const subscriber = await findSubscriber(token)
		return {
			token,
			email: subscriber ? mask(subscriber.email) : null,
			alreadyUnsubscribed: !!subscriber?.unsubscribed_at,
		}
	} catch (e) {
		console.error('[events] find subscriber', e)
		return { token, email: null, alreadyUnsubscribed: false }
	}
}

export const actions = {
	default: async ({ request }) => {
		const token = String((await request.formData()).get('token') ?? '')
		try {
			if (!(await unsubscribe(token))) {
				return fail(404, { message: "We couldn't find that subscription." })
			}
		} catch (e) {
			console.error('[events] unsubscribe', e)
			return fail(500, { message: 'Something went wrong. Please try again.' })
		}
		return { unsubscribed: true }
	},
} satisfies Actions
