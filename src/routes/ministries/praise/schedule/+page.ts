import type { PageLoad } from './$types'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ygo45klz',
  dataset: 'production',
  apiVersion: '2023-03-21',
  useCdn: false,
})

export const load = (async () => {
  const data = await client.fetch(`*[_type == "praise"]`)

  if (data)
    return {
      praise: data,
      tableHeader: [
        'Date',
        'Lead',
        'Guitar',
        'Keys',
        'Bass',
        'Drums',
        'Backup',
        'Sound/AV',
        'Unavailable',
      ],
      tableBody: [
        'date',
        'lead',
        'guitar',
        'keys',
        'bass',
        'drums',
        'backup',
        'av',
        'unavailable',
      ],
    }

  return {
    status: 500,
    body: new Error('Internal Server Error'),
  }
}) satisfies PageLoad