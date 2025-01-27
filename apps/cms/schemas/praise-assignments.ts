export default {
	name: 'praise-assignments',
	type: 'document',
	title: 'Praise Assignments',
	fields: [
		{
			name: 'role',
			type: 'string',
			description: 'Role to be assigned.',
			title: 'Role',
			options: {
				list: [
					'Leaders',
					'Acoustic Guitar',
					'Keys',
					'Bass',
					'Drums',
					'Electric',
					'Backup',
				],
			},
		},
		{
			name: 'names',
			type: 'array',
			description: 'Names of the people to be assigned.',
			title: 'Names',
			of: [{ type: 'string' }],
		},
	],
}
