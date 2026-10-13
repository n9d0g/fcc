import { CRON_SECRET } from '$app/env/private'
import { hasBearer } from '#lib/server/bearer.js'
import { sendPrayerReminders } from '#lib/server/prayer-reminders.js'
import { json } from '@sveltejs/kit'

// Called once a day by .github/workflows/prayer-reminders.yml with
// "Authorization: Bearer <CRON_SECRET>". Safe to call again; nothing is sent twice.
export const POST = async ({ request }) => {
	if (!CRON_SECRET) {
		console.error('[cron] CRON_SECRET is not set')
		return json({ error: 'Not configured' }, { status: 500 })
	}
	if (!hasBearer(request, CRON_SECRET)) {
		return json({ error: 'Unauthorized' }, { status: 401 })
	}

	try {
		return json(await sendPrayerReminders())
	} catch (e) {
		console.error('[cron] prayer reminders', e)
		return json({ error: 'Could not send reminders' }, { status: 500 })
	}
}
