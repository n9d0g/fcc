import type { PageLoad } from './$types'
import { createClient } from '@sanity/client'

const client = createClient({
	projectId: 'ygo45klz',
	dataset: 'production',
	apiVersion: '2023-03-21',
	useCdn: false,
})

export const load = (async () => {
	const data = await client.fetch(`
    *[_type == "birthdays"] {
      name, birthday, pastor, wa
    }
  `)

	if (data)
		return {
			data: data.sort((a, b) => (a.name > b.name ? 1 : -1)),
		}

	return {
		status: 500,
		body: new Error('Internal Server Error'),
	}
}) satisfies PageLoad
