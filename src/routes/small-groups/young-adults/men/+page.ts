import { client, headData } from '$lib/constants'

export const load = async () => {
  const data = await client.fetch(`
    *[_type == "young-adults"] {
      'pdf': pdf.asset->url,
      schedule 
    }
  `)

  if (data)
    return {
      data: data,
      headData: headData.smallgroupsYAMen,
    }

  return {
    status: 500,
    body: new Error('Internal Server Error'),
  }
}
