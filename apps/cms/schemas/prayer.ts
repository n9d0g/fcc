export default {
  name: 'prayer',
  type: 'document',
  title: 'Prayer',
  preview: {
    select: {
      name: 'name',
      date: 'date',
    },
    prepare({ name, date }: { name: string; date: string }) {
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
        subtitle: name || undefined,
      }
    },
  },
  fields: [
    {
      name: 'name',
      title: 'Name',
      description: 'Name of person speaking for given prayer meeting.',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Date',
      description: 'Date for given prayer meeting.',
      type: 'date',
    },
    {
      name: 'scripture',
      title: 'Scripture',
      description: 'Scripture passage for given prayer meeting.',
      type: 'string',
    },
  ],
}
