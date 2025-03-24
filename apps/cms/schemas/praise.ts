export default {
	name: 'praise',
	type: 'document',
	title: 'Praise',
	fields: [
		{
			name: 'date',
			type: 'date',
			description: 'Date of respective service.',
			title: 'Date',
		},
		{
			name: 'lead',
			type: 'string',
			description: 'Worship leader for respective service.',
			title: 'Leader',
		},
		{
			name: 'guitar',
			type: 'string',
			description: 'Guitar player for respective service.',
			title: 'Acoustic Guitar',
		},
		{
			name: 'backup_guitar',
			type: 'string',
			description: 'Backup guitar player for respective service.',
			title: 'Backup Acoustic Guitar',
		},
		{
			name: 'keys',
			type: 'string',
			description: 'Keys/Piano player for respective service.',
			title: 'Keys',
		},
		{
			name: 'bass',
			type: 'string',
			description: 'Bass player for respective service.',
			title: 'Bass',
		},
		{
			name: 'drums',
			type: 'string',
			description: 'Drums player for respective service.',
			title: 'Drums',
		},
		{
			name: 'electric',
			type: 'string',
			description: 'Electric Guitar player for respective service.',
			title: 'Electric',
		},
		{
			name: 'md',
			type: 'string',
			description: 'Music director for respective service.',
			title: 'MD',
		},
		{
			name: 'backup',
			type: 'string',
			description: 'Backup singers for respective service.',
			title: 'Backup',
		},
		{
			name: 'av',
			type: 'string',
			description: 'Audio/Visual for respective service.',
			title: 'Sound/AV',
		},
		{
			name: 'unavailableList',
			type: 'array',
			title: 'Unavailable Members',
			description: 'Unavailable worship members for respective service.',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'name',
							type: 'string',
							title: 'Name',
						},
						{
							name: 'reason',
							type: 'string',
							title: 'Reason',
						},
					],
				},
			],
		},
		{
			name: 'pdf',
			type: 'file',
			description: 'PDF chords for respective service.',
			title: 'Chords',
		},
		{
			name: 'series',
			type: 'string',
			description: 'Sermon Series for respective service.',
			title: 'Series',
		},
		{
			name: 'topic',
			type: 'string',
			description: 'Sermon Topic for respective service.',
			title: 'Sermon Topic',
		},
		{
			name: 'speaker',
			type: 'string',
			description: 'Speaker/Pastor for respective service.',
			title: 'Speaker',
		},
		{
			name: 'scripture',
			type: 'string',
			description: 'Scripture passage for respective service.',
			title: 'Scripture',
		},
		{
			name: 'objective',
			type: 'string',
			description: 'Sermon objective for respective service.',
			title: 'Objective',
		},
		{
			name: 'summary',
			type: 'string',
			description: 'Sermon sunmary for respective service.',
			title: 'Summary',
		},
		{
			name: 'songs',
			type: 'array',
			title: 'Songs',
			description: 'Songs for the service.',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'title',
							type: 'string',
							title: 'Song Title',
						},
						{
							name: 'artist',
							type: 'string',
							title: 'Artist',
						},
					],
				},
			],
		},
	],
}
