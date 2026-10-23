import { links } from '#lib/config/index.js'

export const load = async () => {
	return {
		excelSheet: links.programming.details,
		attendance: links.programming.attendance,
	}
}
