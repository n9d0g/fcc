// Upcoming and past events on fcccanada.ca/events. Publishing a NEW event
// emails everyone subscribed to event updates (see the "event" webhook set up
// in sanity.io/manage), so double-check the details before publishing.
export default {
	name: 'event',
	type: 'document',
	title: 'Events',
	orderings: [
		{
			title: 'Start date, newest first',
			name: 'startDesc',
			by: [{ field: 'start', direction: 'desc' }],
		},
	],
	preview: {
		select: { title: 'title', start: 'start', icon: 'icon' },
		prepare({
			title,
			start,
			icon,
		}: {
			title: string
			start: string
			icon?: string
		}) {
			const date = start
				? new Date(start).toLocaleString('en-CA', {
						timeZone: 'America/Toronto',
						dateStyle: 'medium',
						timeStyle: 'short',
					})
				: 'No date'
			return {
				title: `${icon ? `${icon} ` : ''}${title ?? 'Untitled event'}`,
				subtitle: date,
			}
		},
	},
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Name',
			validation: (rule: any) => rule.required().max(120),
		},
		{
			name: 'icon',
			type: 'string',
			title: 'Icon',
			description:
				'Optional: a single emoji shown next to the event, e.g. 🎄 🍂 🙏 🎶',
			validation: (rule: any) => rule.max(8),
		},
		{
			name: 'start',
			type: 'datetime',
			title: 'Starts',
			description: 'Toronto time.',
			options: { timeStep: 15 },
			validation: (rule: any) => rule.required(),
		},
		{
			name: 'end',
			type: 'datetime',
			title: 'Ends',
			description:
				'Optional. Calendar invites default to 2 hours long when this is empty.',
			options: { timeStep: 15 },
			validation: (rule: any) =>
				rule.custom((end: string | undefined, context: any) =>
					end && context.document?.start && end <= context.document.start
						? 'The end has to be after the start.'
						: true
				),
		},
		{
			name: 'location',
			type: 'string',
			title: 'Location',
			description:
				'Leave empty for the church: 5225 Orbitor Drive, Unit 3, Mississauga.',
		},
		{
			name: 'description',
			type: 'text',
			title: 'Description',
			rows: 5,
			description:
				'Shown on the events page, in the announcement email and in calendar invites.',
			validation: (rule: any) => rule.max(2000),
		},
		{
			name: 'link',
			type: 'string',
			title: 'Link',
			description:
				'Optional page with more details or a recap, e.g. /events/2026/thanksgiving or a full https:// link.',
		},
	],
}
