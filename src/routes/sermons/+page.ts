import { client, headData } from '$lib/constants'

export const load = async () => {
  const data = await client.fetch(`*[_type == "sermons"]`)

  if (data)
    return {
      sermons: data.sort((a: any, b: any) => (a.date < b.date ? 1 : -1)),
      headData: headData.sermons,
    }

  return {
    status: 500,
    body: new Error('Internal Server Error'),
  }
}
