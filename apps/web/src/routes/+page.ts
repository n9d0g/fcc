import { client, links } from '$lib/constants'
import { supabase } from '$lib/supabaseClient'

export const load = async ({ setHeaders }) => {
	// Cache home page for 5 minutes, allow stale for 1 hour while revalidating
	setHeaders({
		'cache-control': 'public, max-age=300, stale-while-revalidate=3600',
	})

	const [{ data: songs }, sermons, pages] = await Promise.all([
		supabase.from('songs').select(),
		client.fetch(`*[_type == "sermons"]`),
		client.fetch(`*[_type == "pages"] {
			page,
			'invite': weeklyInvite.asset->url 
		}`),
	])

	if (sermons && pages)
		return {
			sermons: sermons.sort((a: any, b: any) => (a.date < b.date ? 1 : -1)),
			pages: pages[0],
			links: { googleMaps: links.googleMaps, zoom: links.zoom },
			songs:
				songs?.sort((a: any, b: any) => (a.song_name > b.song_name ? 1 : -1)) ??
				[],
		}

	return {
		status: 500,
		body: new Error('Internal Server Error'),
	}
}
