import { client } from '$lib/constants'

export const load = async () => {
	const data = await client.fetch(`*[_type == "sermons"]`)

	if (data) return { sermons: data.sort((a, b) => (a.date < b.date ? 1 : -1)) }

	return {
		status: 500,
		body: new Error('Internal Server Error'),
	}
}
