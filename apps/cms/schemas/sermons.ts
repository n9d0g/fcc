export default {
  name: 'sermons',
  type: 'document',
  title: 'Sermons',
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
      name: 'thumb',
      type: 'url',
      title: 'Thumb Image',
    },
    {
      name: 'youtube',
      type: 'url',
      title: 'YouTube Link',
    },
  ],
}
