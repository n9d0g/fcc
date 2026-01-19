export default {
  name: 'sunday-ministries',
  type: 'document',
  title: 'Sunday Ministries',
  preview: {
    select: {
      date: 'date',
      presider: 'presider',
    },
    prepare({ date, presider }: { date: string; presider: string }) {
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
        subtitle: presider ? `Presider: ${presider}` : undefined,
      }
    },
  },
  fields: [
    {
      name: 'date',
      type: 'date',
      description: 'Date of given worship service.',
      title: 'Date',
    },
    {
      name: 'presider',
      type: 'string',
      description: 'Presider of given worship service.',
      title: 'Presider',
    },
    {
      name: 'invites',
      type: 'string',
      description: 'Invites sender of given worship service.',
      title: 'Worship Service Invites',
    },
    {
      name: 'powerpoint',
      type: 'string',
      description: 'Assigned PowerPoint person of given worship service.',
      title: 'PowerPoint',
    },
    {
      name: 'communionPresider',
      type: 'string',
      description: 'Assigned communion presider of given worship service.',
      title: 'Communion Presider',
    },
    {
      name: 'openingPrayer',
      type: 'string',
      description: 'Assigned person for opening prayer of given worship service.',
      title: 'Opening Prayer',
    },
    {
      name: 'closingPrayer',
      type: 'string',
      description: 'Assigned person for closing prayer of given worship service.',
      title: 'Closing Prayer',
    },
    {
      name: 'coffeeBreakfast',
      type: 'string',
      description: 'Assigned coffee/breakfast person/family of given worship service.',
      title: 'Coffee / Breakfast',
    },
    {
      name: 'crawlersToddlers',
      type: 'string',
      description: 'Assigned crawlers/toddlers teachers of given worship service.',
      title: 'Crawlers & Toddlers',
    },
    {
      name: 'ssYoung',
      type: 'string',
      description: 'Assigned grades 1-3 teacher of given worship service.',
      title: 'SS Young Kids Grades 1-3',
    },
    {
      name: 'ssOld',
      type: 'string',
      description: 'Assigned grades 4-6 teacher of given worship service.',
      title: 'SS Older Kids Grades 4-6',
    },
    {
      name: 'hallSetup',
      type: 'string',
      description: 'Assigned hall setup person(s) of given worship service.',
      title: 'Hall Set Up',
    },
    {
      name: 'ushersGreeters',
      type: 'string',
      description: 'Assigned ushers and greeters of given worship service.',
      title: 'Ushers / Greeters',
    },
  ],
}
