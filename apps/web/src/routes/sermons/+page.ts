import { client, headData, breadcrumbs } from '$lib/constants'

export const load = async ({ setHeaders }) => {
	const data = await client.fetch(`*[_type == "sermons"]`)
	const breadcrumb = [breadcrumbs.home, breadcrumbs.sermons]

	// Cache sermons for 10 minutes, allow stale for 1 hour while revalidating
	setHeaders({
		'cache-control': 'public, max-age=600, stale-while-revalidate=3600',
	})

	if (data)
		return {
			title: 'Sermons.',
			breadcrumb: breadcrumb,
			sermons: data.sort((a: any, b: any) => (a.date < b.date ? 1 : -1)),
			headData: headData.sermons,
		}

	return {
		status: 500,
		body: new Error('Internal Server Error'),
	}
}
