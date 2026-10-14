import { z } from 'zod'

export const SONG_LIMITS = {
	songName: 200,
	artist: 200,
} as const

// Fields worship leaders fill in to add a row to public.songs
export const songSchema = z.object({
	songName: z
		.string()
		.trim()
		.min(1, { error: 'Please enter the song name.' })
		.max(SONG_LIMITS.songName, {
			error: `Song name must be ${SONG_LIMITS.songName} characters or fewer.`,
		}),
	artist: z
		.string()
		.trim()
		.max(SONG_LIMITS.artist, {
			error: `Artist must be ${SONG_LIMITS.artist} characters or fewer.`,
		}),
	spotify: z
		.string()
		.trim()
		.refine((v) => !v || /^https:\/\/open\.spotify\.com\//.test(v), {
			error: 'Spotify link should start with https://open.spotify.com/',
		}),
})
