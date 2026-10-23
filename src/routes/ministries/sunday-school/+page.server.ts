import {
	gallery,
	sundayMinistries,
	sundaySchoolLinks,
} from '#lib/server/content.js'
import { updatedDataFiltered } from '#lib/utils.js'

export const load = async ({ url }) => {
	const [data, links, photos] = await Promise.all([
		sundayMinistries(),
		sundaySchoolLinks(),
		gallery(url.pathname),
	])
	return {
		sundaySchoolLinks: links,
		gallery: photos,
		tBody: updatedDataFiltered(data, 'date'),
		tHeaders: [
			'Month',
			'Crawlers & Toddlers',
			'SS Grades 1-3',
			'SS Grades 4-6',
		],
	}
}
