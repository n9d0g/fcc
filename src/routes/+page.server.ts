import { loadPublishedPosts } from '#lib/server/blog.js'

export const load = async (event) => {
	// The blog section is optional, so a failure just hides it
	const posts = await loadPublishedPosts(event, 3).catch((err) => {
		console.error('[home] load blog posts', err)
		return []
	})

	return { posts }
}
