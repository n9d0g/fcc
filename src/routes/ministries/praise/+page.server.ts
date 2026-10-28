import { gallery as pageGallery, optional } from '#lib/server/content.js'

export const load = async ({ parent, url }) => {
	const [gallery, { roles, isWorshipMember }] = await Promise.all([
		optional(pageGallery(url.pathname), 'gallery'),
		parent(),
	])

	return {
		gallery,
		// Everything but joining is for the worship team (see schedule/+page.server.ts)
		landingPageItems: isWorshipMember
			? [
					{
						title: 'Schedule',
						link: '/ministries/praise/schedule',
						description: 'Who is serving each Sunday.',
						icon: 'lucide:calendar-days',
					},
					{
						title: 'My Availability',
						link: '/ministries/praise/availability',
						description: "Block out Sundays you can't serve.",
						icon: 'lucide:calendar-x',
					},
					// Worship leaders only (see song-usage/+page.server.ts)
					...(roles?.includes('worship_leader')
						? [
								{
									title: 'Song Usage',
									link: '/ministries/praise/song-usage',
									description: 'How often we sing each song.',
									icon: 'lucide:list-music',
								},
							]
						: []),
					{
						title: 'Worship Director Notes',
						link: 'https://n9d0g.notion.site/worship-director-notes-2cc49c91f89280d5b0a9f6ecd67ea167?source=copy_link',
						description: 'Notes and resources on Notion.',
						icon: 'lucide:notebook-pen',
						external: true,
					},
				]
			: [],
	}
}
