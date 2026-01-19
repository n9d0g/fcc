import { client } from '$lib/constants'

export const load = async ({ url, setHeaders }) => {
	const banner = await client.fetch(`*[_type == "banner"]`)

	// Cache banner for 5 minutes, allow stale for 1 hour while revalidating
	setHeaders({
		'cache-control': 'public, max-age=300, stale-while-revalidate=3600',
	})

	return {
		url: url.pathname,
		banner: banner[0],
	}
}
