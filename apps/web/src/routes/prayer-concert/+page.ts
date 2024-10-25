import { redirect } from '@sveltejs/kit'

export const load = () => {
	redirect(302, '/png/2024/prayer-concert.png')
}
