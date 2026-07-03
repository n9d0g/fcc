import { headData, breadcrumbs } from '$lib/config'
import { supabase } from '$lib/supabaseClient'
import { error } from '@sveltejs/kit'
import { sortByField } from '$lib/utils'

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
			songs: sortByField(songs, 'song_name', 'asc'),
			tHead: ['Song Name', 'Artist', 'Times Played', 'Spotify'],
			headData: headData.songUsage,
		}

	throw error(500, 'Internal Server Error')
}
