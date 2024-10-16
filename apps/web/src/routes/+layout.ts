import { client } from '$lib/constants'
import { activePath } from '$lib/stores/store.js'

export const load = async ({ url }) => {
	const banner = await client.fetch(`*[_type == "banner"]`)

	let activePathValue: string = ''
	activePath.subscribe((value) => (activePathValue = value))

	return {
		url: url.pathname,
		banner: banner[0],
	}
}
