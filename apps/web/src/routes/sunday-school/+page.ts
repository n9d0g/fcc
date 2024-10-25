import { redirect } from '@sveltejs/kit'

export const load = () => {
	redirect(302, '/pdf/2024/sunday-school.pdf')
}
