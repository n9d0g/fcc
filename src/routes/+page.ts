import type { PageLoad } from './$types'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: import.meta.env.VITE_SANITY_ID,
  dataset: 'production',
  apiVersion: '2023-03-21',
  useCdn: false,
})

export const load = (async () => {
  const data = await client.fetch(`*[_type == "sermons"]`)

  if (data)
    return {
      sermons: data.sort((a, b) => (a.date < b.date ? 1 : -1)),
      links: {
        googleMaps:
          'https://www.google.ca/maps/place/5225+Orbitor+Dr,+Mississauga,+ON+L4W+4Y8/@43.6598788,-79.6065117,17z/data=!3m1!4b1!4m6!3m5!1s0x882b38554ef96393:0x5a2b697b840d7a7d!8m2!3d43.6598749!4d-79.604323!16s%2Fg%2F11b8v4jvnm',
        zoom: 'https://us04web.zoom.us/j/3926981154?pwd=d1BHRTB3eStxZFZIS3lyWHBieENvZz09&fbclid=IwAR1N4y1LI5zX5bPnAABrXd_8ICuFko9Hw_5HV2P4wWj7U6JmALskzjO3H_U',
      },
    }

  return {
    status: 500,
    body: new Error('Internal Server Error'),
  }
}) satisfies PageLoad
