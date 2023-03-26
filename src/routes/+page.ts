import type { PageLoad } from './$types'
import { createClient } from '@sanity/client'

const client = createClient({
	projectId: 'ygo45klz',
	dataset: 'production',
	apiVersion: '2023-03-21',
	useCdn: false,
})

export const load = (async () => {
	const data = await client.fetch(`*[_type == "sermons"]`)

	if (data) return { sermons: data.sort((a, b) => (a.date < b.date ? 1 : -1)) }

	return {
		status: 500,
		body: new Error('Internal Server Error'),
	}
}) satisfies PageLoad
