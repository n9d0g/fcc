import { songSchema } from '#lib/schemas/songs.js'
import { requireRole } from '#lib/server/roles.js'
import { sortByField } from '#lib/utils.js'
import { error, fail } from '@sveltejs/kit'
import { z } from 'zod'
import type { Actions, PageServerLoad } from './$types'

// Worship leaders and superusers only. Signed-out visitors are sent to log in
// and everyone else gets a 404. RLS on public.songs enforces the same rule
// for direct queries.
export const load: PageServerLoad = async (event) => {
	await requireRole(event, 'worship_leader')

	const { data: songs, error: err } = await event.locals.supabase
		.from('songs')
		.select()

	if (err || !songs) {
		console.error('[song-usage] load songs', err)
		throw error(500, 'Could not load songs')
	}

	return { songs: sortByField(songs, 'song_name', 'asc') }
}

export const actions = {
	add: async (event) => {
		await requireRole(event, 'worship_leader')
		const formData = await event.request.formData()
		const parsed = songSchema.safeParse({
			songName: String(formData.get('songName') ?? ''),
			artist: String(formData.get('artist') ?? ''),
			spotify: String(formData.get('spotify') ?? ''),
		})
		if (!parsed.success) {
			const { fieldErrors } = z.flattenError(parsed.error)
			const message =
				Object.values(fieldErrors).flat()[0] ?? 'Please check the form.'
			return fail(400, { message })
		}
		const { songName, artist, spotify } = parsed.data

		const { error: err } = await event.locals.supabase.from('songs').insert({
			song_name: songName,
			artist: artist || null,
			spotify: spotify || null,
			times_played: 0,
		})
		if (err) {
			if (err.code === '23505') {
				return fail(409, { message: 'That song is already in the list.' })
			}
			console.error('[song-usage] add song', err)
			return fail(500, { message: 'Could not add the song.' })
		}

		return { added: songName }
	},
} satisfies Actions
