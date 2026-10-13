import { requireAdmin } from '#lib/server/worship-requests.js'
import { sortByField } from '#lib/utils.js'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

// Superusers only. Signed-out visitors are sent to log in and everyone else
// gets a 404. RLS on public.songs enforces the same rule for direct queries.
export const load: PageServerLoad = async (event) => {
	await requireAdmin(event)

	const { data: songs, error: err } = await event.locals.supabase
		.from('songs')
		.select()

	if (err || !songs) {
		console.error('[song-usage] load songs', err)
		throw error(500, 'Could not load songs')
	}

	return { songs: sortByField(songs, 'song_name', 'asc') }
}
