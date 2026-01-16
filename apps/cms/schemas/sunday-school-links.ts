export default {
	name: 'sunday-school-links',
	type: 'document',
	title: 'Sunday School Links',
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Button Title',
			description: 'The text displayed on the button.',
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'url',
			type: 'string',
			title: 'URL',
			description:
				'The link URL. Can be a full URL (https://...) or a relative path (/pdf/file.pdf). Optional if PDF is provided.',
		},
		{
			name: 'pdf',
			type: 'file',
			title: 'PDF File',
			description:
				'Upload a PDF file. If provided, this will be used instead of the URL.',
			options: {
				accept: '.pdf',
			},
		},
		{
			name: 'section',
			type: 'string',
			title: 'Section',
			description: 'Which section this link belongs to.',
			options: {
				list: [
					{ title: 'Junior Material', value: 'junior' },
					{ title: 'Primary Material', value: 'primary' },
					{ title: 'Additional Links', value: 'additional' },
				],
				layout: 'radio',
			},
			initialValue: 'additional',
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'openInNewTab',
			type: 'boolean',
			title: 'Open in New Tab',
			description: 'If enabled, the link will open in a new browser tab.',
			initialValue: true,
		},
		{
			name: 'order',
			type: 'number',
			title: 'Display Order',
			description: 'Lower numbers appear first within the section.',
			initialValue: 0,
		},
	],
	preview: {
		select: {
			title: 'title',
			section: 'section',
			url: 'url',
			pdf: 'pdf',
		},
		prepare({
			title,
			section,
			url,
			pdf,
		}: {
			title: string
			section: string
			url: string
			pdf: any
		}) {
			const sectionLabels: Record<string, string> = {
				junior: 'Junior',
				primary: 'Primary',
				additional: 'Additional',
			}
			const linkType = pdf ? 'PDF' : url || 'No link'
			return {
				title,
				subtitle: `${sectionLabels[section] || section} | ${linkType}`,
			}
		},
	},
}
