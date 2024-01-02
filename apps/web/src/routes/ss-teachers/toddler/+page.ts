import { client, headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const data = await client.fetch(`
		*[_type == "sunday-school" && class == 'Toddler'] {
			class, lessons
		}
  `)

	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.sundaySchool.teachers,
		breadcrumbs.sundaySchool.toddler,
	]

	return {
		title: 'Toddler Class',
		breadcrumb: breadcrumb,
		headData: headData.sundaySchool.toddler,
		lessons: data[0].lessons,
	}
}
