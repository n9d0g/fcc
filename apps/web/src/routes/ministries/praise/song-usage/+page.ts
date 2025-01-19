import { headData, breadcrumbs } from '$lib/constants'
import { supabase } from '$lib/supabaseClient'

export const load = async () => {
	const { data: songs } = await supabase.from('songs').select()
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.praise,
		breadcrumbs.ministries.praise.songUsage,
	]

	if (songs)
		return {
			title: 'Song Usage',
			breadcrumb: breadcrumb,
			songs:
				songs.sort((a: any, b: any) => (a.song_name > b.song_name ? 1 : -1)) ??
				[],
			tHead: ['Song Name', 'Artist', 'Times Played', 'Spotify'],
			headData: headData.songUsage,
		}

	return {
		status: 500,
		body: new Error('Internal Server Error'),
	}
}
