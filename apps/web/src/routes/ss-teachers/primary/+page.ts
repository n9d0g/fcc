import { client, headData, breadcrumbs } from '$lib/constants'

export const load = async () => {
	const data = await client.fetch(`
		*[_type == "sunday-school" && class == 'Primary'] {
			class, lessons
		}
  `)

	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.sundaySchool.teachers,
		breadcrumbs.sundaySchool.primary,
	]

	return {
		title: 'Primary Class',
		breadcrumb: breadcrumb,
		headData: headData.sundaySchool.primary,
		lessons: data[0].lessons,
	}
}
