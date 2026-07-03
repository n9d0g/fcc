import { client, headData, breadcrumbs } from '$lib/config'
import { setCacheHeaders, CACHE_PRESETS } from '$lib/utils'
import { error } from '@sveltejs/kit'

export const load = async ({ setHeaders, url }) => {
	// Cache praise schedule for 10 minutes, allow stale for 1 hour (bust=true to bypass)
	setCacheHeaders(setHeaders, url, ...CACHE_PRESETS.short)

	const data = await client.fetch(`
    *[_type == "praise"] {
      backup, bass, date, drums, electric, guitar, backup_guitar, keys, lead, md, objective, scripture, series, speaker, summary, topic, unavailable, songs, unavailableList,
      'pdfURL': pdf.asset->url
    }
  `)
	const praiseAssignments = await client.fetch(`
    *[_type == "praise-assignments"] {
      role, names
    }
  `)

	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.praise,
		breadcrumbs.ministries.praise.schedule,
	]

	if (data)
		return {
			title: 'Praise Schedule.',
			breadcrumb: breadcrumb,
			praise: data,
			praiseAssignments: praiseAssignments,
			tHead: [
				'Date 📅',
				'Lead 🎤',
				'Guitar 🎸',
				'Guitar 2 🎸',
				'Keys 🎹',
				'Bass 🎸',
				'Drums 🥁',
				'Electric 🎸',
				'MD 🧠',
				'Backup 🗣️',
				'Unavailable 🙅‍♂️',
			],
			tBody: [
				'date',
				'lead',
				'guitar',
				'backup_guitar',
				'keys',
				'bass',
				'drums',
				'electric',
				'md',
				'backup',
				'unavailableList',
			],
			tableMeta: [
				'series',
				'topic',
				'speaker',
				'scripture',
				'objective',
				'summary',
				'date',
				'pdfURL',
			],
			headData: headData.schedule,
			filterData: [
				{
					label: 'Lead 🎤',
					value: 'lead',
				},
				{
					label: 'Guitar 🎸',
					value: 'guitar',
				},
				{
					label: 'Keys 🎹',
					value: 'keys',
				},
				{
					label: 'Bass 🎸',
					value: 'bass',
				},
				{
					label: 'Drums 🥁',
					value: 'drums',
				},
				{
					label: 'Electric 🎸',
					value: 'electric',
				},
				{
					label: 'Backup 🗣️',
					value: 'backup',
				},
				{
					label: 'Unavailable 🙅‍♂️',
					value: 'unavailable',
				},
			],
		}

	throw error(500, 'Internal Server Error')
}
