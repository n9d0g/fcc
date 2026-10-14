import { headData, breadcrumbs } from '#lib/config/index.js'

// Schedule and roster come from Supabase (+page.server.ts). Not cached, so
// worship leaders' edits show up straight away.
export const load = async ({ data }) => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.praise,
		breadcrumbs.ministries.praise.schedule,
	]

	return {
		...data,
		title: 'Praise Schedule.',
		breadcrumb: breadcrumb,
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
}
