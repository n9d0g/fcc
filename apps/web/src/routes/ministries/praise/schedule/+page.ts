import { client, headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const data = await client.fetch(`
    *[_type == "praise"] {
      av, backup, bass, date, drums, electric, guitar, keys, lead, objective, scripture, series, speaker, summary, topic, unavailable,
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
			tableHeader: [
				'Date 📅',
				'Lead 🎤',
				'Guitar 🎸',
				'Keys 🎹',
				'Bass 🎸',
				'Drums 🥁',
				'Electric 🎸',
				'Backup 🗣️',
				'AV 🔊',
				'Unavailable 🙅‍♂️',
			],
			tableBody: [
				'date',
				'lead',
				'guitar',
				'keys',
				'bass',
				'drums',
				'electric',
				'backup',
				'av',
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
					keys: 'Ally (late 2024 👀)',
					bass: 'Ian',
					drums: 'James',
					electric: 'Nathan',
					backup: 'Frances',
				},
				{
					leader: 'John',
					acousticGuitar: 'John',
					keys: 'Joi',
					bass: 'John',
					drums: 'Miguel',
					backup: 'Ian',
				},
				{
					leader: 'Joi',
					acousticGuitar: 'Nathan',
					keys: 'Nathan',
					bass: 'Nathan',
					drums: 'Nathan',
					backup: 'James',
				},
				{
					leader: 'Nathan',
					acousticGuitar: 'Rommel',
					keys: 'Noreen',
					bass: 'Noreen',
					backup: 'John',
				},
				{
					leader: 'Raquel',
					keys: 'Rommel',
					bass: 'Rommel',
					backup: 'Joi',
				},
				{
					leader: 'Rommel',
					backup: 'Nathan',
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
					backup: 'Yana',
				},
			],
		}

	return {
		status: 500,
		body: new Error('Internal Server Error'),
	}
}
