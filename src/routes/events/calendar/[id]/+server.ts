import { eventIcs } from '#lib/events.js'
import { event as findEvent } from '#lib/server/content.js'
import { error } from '@sveltejs/kit'

// .ics download for one event: the "Apple / other" button in emails and on
// /events. Apple Calendar, Outlook desktop and most others open these.
export const GET = async ({ params }) => {
	const event = await findEvent(params.id)
	if (!event?.start) throw error(404, 'Event not found')

	const filename = event.title
		.replace(/[^a-z0-9]+/gi, '-')
		.replace(/^-|-$/g, '')
		.toLowerCase()

	return new Response(eventIcs(event), {
		headers: {
			'content-type': 'text/calendar; charset=utf-8',
			'content-disposition': `attachment; filename="${filename || 'fcc-event'}.ics"`,
			'cache-control': 'public, max-age=300',
		},
	})
}
