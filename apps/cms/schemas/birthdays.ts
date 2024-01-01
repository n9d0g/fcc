export default {
  name: 'birthdays',
  type: 'document',
  title: 'Birthdays',
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
