import { headData, breadcrumbs } from '#lib/config/index.js'

export const load = async ({ data }) => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.praise,
		breadcrumbs.ministries.praise.songUsage,
	]

	return {
		...data,
		title: 'Song Usage',
		breadcrumb: breadcrumb,
		tHead: ['Song Name', 'Artist', 'Times Played', 'Spotify'],
		headData: headData.songUsage,
	}
}
