export default {
  name: 'leadership',
  type: 'document',
  title: 'Leadership',
  fields: [
    {
      name: 'name',
      title: 'Name',
      description: 'Name of leader.',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      description: 'Leader title.',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      description: 'Image of leader.',
      type: 'file',
    },
    {
      name: 'sort',
      title: 'Sort Number',
      description: 'Sort order number of leader, lowest to highest.',
      type: 'number',
    },
    {
      name: 'subministries',
      type: 'array',
      description: 'Sub-ministries under each deacon.',
      title: 'Sub-Ministries',
      of: [
        {
          name: 'subministry',
          type: 'document',
          title: 'Sub-Ministry',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Name',
            },
            {
              name: 'ministry',
              type: 'string',
              title: 'Ministry',
            },
          ],
        },
      ],
    },
  ],
}
