import { redirect } from '@sveltejs/kit'

export const load = () => {
	redirect(302, '/pdf/retreat-script.pdf')
}