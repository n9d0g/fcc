import { client, headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const data = await client.fetch(`
    *[_type == "leadership"] {
			name, title, subministries, sort,
      'img': image.asset->url
    }
  `)

	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.about,
		breadcrumbs.about.leadership,
	]

	if (data) {
		return {
			title: 'Leadership.',
			breadcrumb: breadcrumb,
			leaders: data.sort((a: any, b: any) => (a.sort > b.sort ? 1 : -1)),
			headData: headData.leadership,
		}
	}
}
