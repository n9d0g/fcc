import { client } from '$lib/constants'

export const load = async ({ url }) => {
	const banner = await client.fetch(`*[_type == "banner"]`)

	return {
		url: url.pathname,
		banner: banner[0],
	}
}
