export default {
	name: 'banner',
	type: 'document',
	title: 'Banner',
	fields: [
		{
			name: 'title',
			title: 'Banner Title',
			type: 'string',
		},
		{
			name: 'body',
			title: 'Banner Body',
			type: 'array',
			of: [
				{
					type: 'block',
					styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'H1', value: 'h1' },
						{ title: 'H2', value: 'h2' },
						{ title: 'H3', value: 'h3' },
					],
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
			name: 'date',
			title: 'Banner End Date',
			type: 'date',
		},
	],
}
