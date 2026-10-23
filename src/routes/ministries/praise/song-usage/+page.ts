export const load = async ({ data }) => {
	return {
		...data,
		tHead: ['Song Name', 'Artist', 'Times Played', 'Spotify'],
	}
}
