export default {
	name: 'banner',
	type: 'document',
	title: 'Banner',
	preview: {
		select: { title: 'title', start: 'startDate', end: 'date' },
		prepare: ({ title, start, end }) => ({
			title: title || 'Untitled banner',
			subtitle: `${start ?? 'Now'} → ${end ?? '?'}`,
		}),
	},
	fields: [
		{
			name: 'title',
			title: 'Banner Title',
			description: 'Short headline, e.g. "Service moved to 11am this Sunday"',
			type: 'string',
			validation: (Rule) => Rule.required().max(80),
		},
		{
			name: 'body',
			title: 'Banner Body',
			description: 'One or two sentences. Add a link for more details.',
			type: 'array',
			of: [
				{
					type: 'block',
					styles: [{ title: 'Normal', value: 'normal' }],
					lists: [],
					marks: {
						decorators: [
							{ title: 'Strong', value: 'strong' },
							{ title: 'Emphasis', value: 'em' },
						],
						annotations: [
							{
								name: 'link',
								type: 'object',
								fields: [{ name: 'href', type: 'url', title: 'URL' }],
							},
						],
					},
				},
			],
		},
		{
			name: 'startDate',
			title: 'Banner Start Date',
			description: 'First day to show the banner. Leave empty to show it now.',
			type: 'date',
		},
		{
			name: 'date',
			title: 'Banner End Date',
			description:
				'Last day to show the banner (it hides after this day ends).',
			type: 'date',
			validation: (Rule) =>
				Rule.required().custom((end, { document }) =>
					document?.startDate && end && end < document.startDate
						? 'End date must be on or after the start date'
						: true
				),
		},
	],
}
