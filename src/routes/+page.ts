import type { PageLoad } from './$types'
import { client, links } from '$lib/constants'

export const load = (async () => {
  const sermons = await client.fetch(`*[_type == "sermons"]`)
  const pages = await client.fetch(`*[_type == "pages"]`)

  if (sermons && pages)
    return {
      sermons: sermons.sort((a, b) => (a.date < b.date ? 1 : -1)),
      pages: pages[0],
      links: { googleMaps: links.googleMaps, zoom: links.zoom },
    }

  return {
    status: 500,
    body: new Error('Internal Server Error'),
  }
}) satisfies PageLoad
