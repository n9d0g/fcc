export default {
  name: 'birthdays',
  type: 'document',
  title: 'Birthdays',
  preview: {
    select: {
      name: 'name',
      birthday: 'birthday',
      pastor: 'pastor',
      wa: 'wa',
    },
    prepare({ name, birthday, pastor, wa }: { name: string; birthday: string; pastor: boolean; wa: boolean }) {
      const formattedDate = birthday
        ? new Date(birthday).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            timeZone: 'UTC',
          })
        : 'No date'
      const tags = [pastor && '👨‍🏫 Pastor', wa && '💒 Anniversary'].filter(Boolean).join(' | ')
      return {
        title: name || 'Unnamed',
        subtitle: [formattedDate, tags].filter(Boolean).join(' - '),
      }
    },
  },
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'birthday',
      title: 'Birthday',
      type: 'date',
    },
    {
      name: 'pastor',
      title: 'Pastor',
      type: 'boolean',
    },
    {
      name: 'wa',
      title: 'Wedding Anniversary',
      type: 'boolean',
    },
  ],
}
