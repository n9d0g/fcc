export default {
	name: 'sunday-school',
	type: 'document',
	title: 'Sunday School',
	fields: [
		{
			name: 'class',
			type: 'string',
			title: 'Class',
			description: 'Type of Sunday School class.',
		},
		{
			name: 'lessons',
			type: 'array',
			title: 'Lessons',
			description: 'Lesson (week)',
			of: [{ type: 'string' }],
		},
	],
}
