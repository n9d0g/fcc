import { client, headData, breadcrumbs } from '$lib/constants'
import { updatedDataFiltered } from '$lib/utils'
import { isAfter, startOfDay } from 'date-fns'

export const load = async () => {
	const data = await client.fetch(`*[_type == "sunday-ministries"]`)
	const sundaySchoolData = await client.fetch(`*[_type == "sunday-school"]{
		date,
		class,
		'lessonPlanPdf': lesson_plan.asset->url,
		'worksheetPdf': worksheet.asset->url
	}`)
	const sundaySchoolLinks = await client.fetch(`*[_type == "sunday-school-links"] | order(order asc) {
		title,
		url,
		'pdfUrl': pdf.asset->url,
		section,
		openInNewTab
	}`)
	const gallery = await client.fetch(`*[_type == "page-gallery" && pageUrl == "/ministries/sunday-school"][0]{
		title,
		photos[]{
			"url": asset->url,
			alt,
			caption
		}
	}`)
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.sundaySchool,
	]

	const today = startOfDay(new Date())
	const filteredSundaySchoolData = sundaySchoolData.filter((item: any) =>
		isAfter(new Date(item.date), today)
	)

	return {
		title: 'FCC Sunday School Ministry.',
		breadcrumb: breadcrumb,
		headData: headData.sundaySchool,
		sundaySchoolData: filteredSundaySchoolData,
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
