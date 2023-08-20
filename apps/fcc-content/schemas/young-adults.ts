export default {
  name: 'young-adults',
  type: 'document',
  title: 'Young Adults',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'pdf',
      type: 'file',
      title: 'Book PDF',
    },
    {
      name: 'schedule',
      type: 'array',
      title: 'Schedule',
      of: [
        {
          name: 'week',
          type: 'document',
          title: 'Week',
          fields: [
            {
              name: 'leader',
              type: 'string',
              title: 'Leader',
            },
            {
              name: 'date',
              type: 'date',
              title: 'Date',
            },
            {
              name: 'week',
              type: 'number',
              title: 'Week',
            },
            {
              name: 'chapter',
              type: 'string',
              title: 'Chapter Name',
            },
          ],
        },
      ],
    },
  ],
}
