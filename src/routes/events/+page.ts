import { headData, breadcrumbs, client } from '#lib/config/index.js'
import { EVENT_FIELDS, type FccEvent } from '#lib/events.js'

export const load = async () => {
	const events = await client.fetch<FccEvent[]>(
		`*[_type == "event" && defined(start) && !(_id in path("drafts.**"))] | order(start desc) { ${EVENT_FIELDS} }`
	)

	return {
		title: 'FCC Events.',
		breadcrumb: [breadcrumbs.home, breadcrumbs.events],
		headData: headData.events,
		events: events ?? [],
	}
}
