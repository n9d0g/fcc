import { client } from '#lib/config/index.js'
import { setCacheHeaders, CACHE_PRESETS } from '#lib/utils.js'

export const load = async ({ setHeaders, url }) => {
	// Cache leadership for 1 hour, allow stale for 24 hours (bust=true to bypass)
	setCacheHeaders(setHeaders, url, ...CACHE_PRESETS.long)

	const data = await client.fetch(`
    *[_type == "leadership"] {
			name, title, subministries, sort,
      'img': image.asset->url
    }
  `)

	if (data) {
		return {
			leaders: data.sort((a: any, b: any) => (a.sort > b.sort ? 1 : -1)),
		}
	}
}
