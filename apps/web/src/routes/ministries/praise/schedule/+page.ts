import { client, headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const data = await client.fetch(`
    *[_type == "praise"] {
      backup, bass, date, drums, electric, guitar, keys, lead, md, objective, scripture, series, speaker, summary, topic, unavailable,
      'pdfURL': pdf.asset->url
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
			tHead: [
				'Date 📅',
				'Lead 🎤',
				'Guitar 🎸',
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
				'keys',
				'bass',
				'drums',
				'electric',
				'md',
				'backup',
				'unavailable',
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
			worshipAssignments: [
				{
					leader: 'James',
					acousticGuitar: 'Ian',
					keys: 'Joi',
					bass: 'Ian',
					drums: 'James',
					electric: 'Nathan',
					backup: 'Frances',
				},
				{
					leader: 'Frances',
					acousticGuitar: 'Travis',
					keys: 'Nathan',
					bass: 'Nathan',
					drums: 'Miguel',
					backup: 'Ian',
				},
				{
					leader: 'Joi',
					acousticGuitar: 'Nathan',
					keys: 'Noreen',
					bass: 'Noreen',
					drums: 'Nathan',
					backup: 'James',
				},
				{
					leader: 'Nathan',
					acousticGuitar: 'Rommel',
					keys: 'Rommel',
					bass: 'Rommel',
					backup: 'Lexie',
				},
				{
					leader: 'Raquel',
					acousticGuitar: 'James',
					bass: 'Noreen',
					backup: 'Joi',
				},
				{
					leader: 'Rommel',
					backup: 'Nathan',
					bass: 'Miguel (2nd half of 2025)',
				},
				{
					backup: 'Noreen',
				},
				{
					backup: 'Raquel',
				},
				{
					backup: 'Rommel',
				},
				{
					backup: 'Ymuz',
				},
				{
					backup: 'Yanna',
				},
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

	return {
		status: 500,
		body: new Error('Internal Server Error'),
	}
}
