import { events } from '#lib/server/content.js'
import { subscribe } from '#lib/server/event-subscribers.js'
import { fail } from '@sveltejs/kit'
import { z } from 'zod'
import type { Actions } from './$types'

const emailSchema = z.email().max(254)

export const load = async () => {
	return { events: (await events()) ?? [] }
}

export const actions = {
	subscribe: async ({ request, url }) => {
		const formData = await request.formData()
		const email = String(formData.get('email') ?? '')
			.trim()
			.toLowerCase()

		// Honeypot: hidden from people, but bots fill in every field
		if (String(formData.get('website') ?? ''))
			return { subscribed: true as const }

		if (!emailSchema.safeParse(email).success) {
			return fail(400, {
				email,
				message: 'Please enter a valid email address.',
			})
		}

		try {
			await subscribe(email, url.origin)
		} catch (e) {
			console.error('[events] subscribe', e)
			return fail(500, {
				email,
				message: "We couldn't sign you up just now. Please try again later.",
			})
		}

		// Same answer whether or not they were already subscribed
		return { subscribed: true as const }
	},
} satisfies Actions
