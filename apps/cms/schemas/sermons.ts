export default {
  name: 'sermons',
  type: 'document',
  title: 'Sermons',
  preview: {
    select: {
      date: 'date',
      title: 'title',
      speaker: 'speaker',
    },
    prepare({ date, title, speaker }: { date: string; title: string; speaker: string }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            timeZone: 'UTC',
          })
        : 'No date'
      return {
        title: formattedDate,
        subtitle: [title, speaker].filter(Boolean).join(' - '),
      }
    },
  },
  fields: [
    {
      name: 'date',
      type: 'date',
      title: 'Date',
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'speaker',
      type: 'string',
      title: 'Speaker',
    },
    {
      name: 'scripture',
      type: 'string',
      title: 'Scripture',
    },
    {
      name: 'youtube',
      type: 'url',
      title: 'YouTube Link',
    },
  ],
}
