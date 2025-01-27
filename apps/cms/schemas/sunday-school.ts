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
			name: 'date',
			type: 'date',
			title: 'Date',
			description: 'Date of the Sunday School class (by month).',
		},
		{
			name: 'lesson_plan',
			type: 'file',
			title: 'Lesson Plan',
			description: 'Lesson plan for given class.',
		},
		{
			name: 'worksheet',
			type: 'file',
			title: 'Worksheet',
			description: 'Worksheet for given class.',
		},
	],
}
