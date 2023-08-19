import { client, headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const data = await client.fetch(`
    *[_type == "young-adults"] {
      'pdf': pdf.asset->url,
      schedule 
    }
  `)

	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.smallgroups,
		breadcrumbs.smallgroups.ya,
		breadcrumbs.smallgroups.ya.men,
	]

	if (data)
		return {
			title: "FCC Young Adults Men's Small Group.",
			breadcrumb: breadcrumb,
			headData: headData.smallgroupsYAMen,
			data: data,
		}

	return {
		status: 500,
		body: new Error('Internal Server Error'),
	}
}
