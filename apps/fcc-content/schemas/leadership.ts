export default {
  name: 'leadership',
  type: 'document',
  title: 'Leadership',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'file',
    },
    {
      name: 'sort',
      title: 'Sort Number',
      type: 'number',
    },
    {
      name: 'subministries',
      type: 'array',
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
