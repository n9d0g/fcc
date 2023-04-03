import type { PageLoad } from './$types'
import { client } from '$lib/constants'

export const load = (async () => {
  const data = await client.fetch(`
    *[_type == "birthdays"] {
      name, birthday, pastor, wa
    }
  `)

  if (data)
    return {
      data: data.sort((a, b) => (a.name > b.name ? 1 : -1)),
    }

  return {
    status: 500,
    body: new Error('Internal Server Error'),
  }
}) satisfies PageLoad
