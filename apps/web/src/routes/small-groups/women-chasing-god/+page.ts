import { client, headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.smallgroups,
		breadcrumbs.smallgroups.womenChasingGod,
	]

	const gallery = await client.fetch(`*[_type == "page-gallery" && pageUrl == "/small-groups/women-chasing-god"][0]{
		title,
		photos[]{
			"url": asset->url,
			alt,
			caption
		}
	}`)

	return {
		title: 'FCC Women Chasing God Small Group.',
		breadcrumb: breadcrumb,
		headData: headData.smallgroupsWCG,
		gallery,
	}
}
