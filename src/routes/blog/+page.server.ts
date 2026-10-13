import { loadAuthor, loadPublishedPosts } from '#lib/server/blog.js'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
	const [posts, { user, request }] = await Promise.all([
		loadPublishedPosts(event, 60).catch((err) => {
			console.error('[blog] load posts', err)
			throw error(500, 'Could not load the blog')
		}),
		loadAuthor(event),
	])

	return {
		posts,
		// Drives the "write for the blog" button
		authorStatus: !user
			? ('signedOut' as const)
			: (request?.status ?? ('none' as const)),
	}
}
