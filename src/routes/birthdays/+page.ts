import { client, headData } from '$lib/constants'

export const load = async () => {
  const data = await client.fetch(`
    *[_type == "birthdays"] {
      name, birthday, pastor, wa
    }
  `)

  if (data)
    return {
      data: data.sort((a: any, b: any) => (a.name > b.name ? 1 : -1)),
      headData: headData.birthdays,
      months: [
        {
          name: 'All',
          value: 0,
        },
        {
          name: 'January',
          value: 1,
        },
        {
          name: 'February',
          value: 2,
        },
        {
          name: 'March',
          value: 3,
        },
        {
          name: 'April',
          value: 4,
        },
        {
          name: 'May',
          value: 5,
        },
        {
          name: 'June',
          value: 6,
        },
        {
          name: 'July',
          value: 7,
        },
        {
          name: 'August',
          value: 8,
        },
        {
          name: 'September',
          value: 9,
        },
        {
          name: 'October',
          value: 10,
        },
        {
          name: 'November',
          value: 11,
        },
        {
          name: 'December',
          value: 12,
        },
      ],
    }

  return {
    status: 500,
    body: new Error('Internal Server Error'),
  }
}
