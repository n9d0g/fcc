import { client, headData } from '$lib/constants'

export const load = async () => {
	const data = await client.fetch(`
    *[_type == "leadership"] {
			name, title, subministries, sort,
      'img': image.asset->url
    }
  `)

	if (data) {
		return {
			leaders: data.sort((a: any, b: any) => (a.sort > b.sort ? 1 : -1)),
			headData: headData.leadership,
		}
	}
}
