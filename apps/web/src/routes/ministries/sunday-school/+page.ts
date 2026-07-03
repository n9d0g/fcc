import { client, headData, breadcrumbs, fetchPageGallery } from '$lib/config'
import { updatedDataFiltered } from '$lib/utils'

export const load = async () => {
	const data = await client.fetch(`*[_type == "sunday-ministries"]`)
	const sundaySchoolLinks =
		await client.fetch(`*[_type == "sunday-school-links"] | order(order asc) {
		title,
		url,
		'pdfUrl': pdf.asset->url,
		section,
		openInNewTab
	}`)
	const gallery = await fetchPageGallery('/ministries/sunday-school')
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.sundaySchool,
	]

	return {
		title: 'FCC Sunday School Ministry.',
		breadcrumb: breadcrumb,
		headData: headData.sundaySchool,
		sundaySchoolLinks,
		gallery,
		tBody: updatedDataFiltered(data, 'date'),
		tHeaders: [
			'Month',
			'Crawlers & Toddlers',
			'SS Grades 1-3',
			'SS Grades 4-6',
		],
	}
}
