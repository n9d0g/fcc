export default {
	name: 'page-gallery',
	type: 'document',
	title: 'Page Gallery',
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Gallery Title',
			description: 'A name for this gallery (for reference in the CMS).',
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'pageUrl',
			type: 'string',
			title: 'Page URL',
			description:
				'The page URL where these photos should be displayed (e.g., /small-groups/women-chasing-god).',
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'photos',
			type: 'array',
			title: 'Photos',
			description: 'Upload multiple photos for this gallery.',
			of: [
				{
					type: 'image',
					options: {
						hotspot: true,
					},
					fields: [
						{
							name: 'alt',
							type: 'string',
							title: 'Alt Text',
							description: 'Describe the image for accessibility.',
						},
						{
							name: 'caption',
							type: 'string',
							title: 'Caption',
							description: 'Optional caption for the image.',
						},
					],
				},
			],
			validation: (Rule: any) => Rule.min(1),
		},
	],
	preview: {
		select: {
			title: 'title',
			pageUrl: 'pageUrl',
			media: 'photos.0',
		},
		prepare({
			title,
			pageUrl,
			media,
		}: {
			title: string
			pageUrl: string
			media: any
		}) {
			return {
				title,
				subtitle: pageUrl,
				media,
			}
		},
	},
}
