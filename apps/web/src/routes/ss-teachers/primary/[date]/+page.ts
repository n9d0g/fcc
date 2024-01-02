import { client, headData, breadcrumbs } from '$lib/constants'

export const load = async ({ params }) => {
	const { date } = params

	const data = await client.fetch(`
		*[_type == "sunday-school" && class == 'Primary'] {
			class, lessons
		}
  `)

	const lesson = data[0].lessons.filter(
		(lesson: any) => lesson.date === date
	)[0]

	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.sundaySchool.teachers,
		breadcrumbs.sundaySchool.primary,
		{
			title: lesson.date,
		},
	]

	return {
		title: `${lesson.date} Lesson.`,
		breadcrumb: breadcrumb,
		headData: headData.sundaySchool.primary,
		lesson: lesson,
	}
}
