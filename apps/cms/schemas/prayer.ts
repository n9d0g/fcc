export default {
  name: 'prayer',
  type: 'document',
  title: 'Prayer',
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
