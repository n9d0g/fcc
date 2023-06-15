import { client, headData } from '$lib/constants'

export const load = async () => {
	const data = await client.fetch(`
    *[_type == "leadership"] {
			name, title, subministries,
      'img': image.asset->url
    }
  `)

	if (data) {
		return {
			leaders: data,
			headData: headData.leadership,
		}
	}
}
