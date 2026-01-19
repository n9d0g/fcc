export default {
	name: 'praise-assignments',
	type: 'document',
	title: 'Praise Assignments',
	preview: {
		select: {
			role: 'role',
			names: 'names',
		},
		prepare({ role, names }: { role: string; names: string[] }) {
			const count = names?.length || 0
			return {
				title: role || 'No role',
				subtitle: `${count} ${count === 1 ? 'person' : 'people'} assigned`,
			}
		},
	},
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
