import { client, headData, breadcrumbs } from '$lib/constants'

export const load = async ({ setHeaders }) => {
	// Cache leadership for 1 hour, allow stale for 24 hours while revalidating
	setHeaders({
		'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
	})

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
