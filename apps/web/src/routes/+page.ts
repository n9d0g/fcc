import { client, links } from '$lib/constants'

export const load = async () => {
	const sermons = await client.fetch(`*[_type == "sermons"]`)
	const pages = await client.fetch(`*[_type == "pages"] {
		page,
		'invite': weeklyInvite.asset->url 
	}`)

	if (sermons && pages)
		return {
			sermons: sermons.sort((a: any, b: any) => (a.date < b.date ? 1 : -1)),
			pages: pages[0],
			links: { googleMaps: links.googleMaps, zoom: links.zoom },
		}

	return {
		status: 500,
		body: new Error('Internal Server Error'),
	}
}
