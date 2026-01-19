import { client, headData, breadcrumbs } from '$lib/constants'
import { setCacheHeaders } from '$lib/utils'

export const load = async ({ setHeaders, url }) => {
	// Cache leadership for 1 hour, allow stale for 24 hours (bust=true to bypass)
	setCacheHeaders(setHeaders, url, 3600, 86400)

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
