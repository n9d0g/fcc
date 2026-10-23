// Schedule and roster come from Supabase (+page.server.ts). Not cached, so
// worship leaders' edits show up straight away.
export const load = async ({ data }) => {
	return {
		...data,
		tHead: [
			'Date 📅',
			'Lead 🎤',
			'Guitar 🎸',
			'Guitar 2 🎸',
			'Keys 🎹',
			'Bass 🎸',
			'Drums 🥁',
			'Electric 🎸',
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
