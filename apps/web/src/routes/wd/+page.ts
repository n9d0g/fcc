import { redirect } from '@sveltejs/kit'

export const load = () => {
	redirect(
		302,
		'https://n9d0g.notion.site/worship-director-notes-2cc49c91f89280d5b0a9f6ecd67ea167?source=copy_link'
	)
}
