import type { BlogPost } from '#lib/schemas/blog.js'
import { reviewPostAction } from '#lib/server/blog.js'
import { error } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

// RLS shows published posts to everyone, and unpublished ones only to their
// author and superusers, so this doubles as the preview page linked from emails
export const load: PageServerLoad = async ({ locals, params }) => {
	const [{ data: post, error: err }, viewer] = await Promise.all([
		locals.supabase
			.from('blog_posts')
			.select('*')
			.eq('slug', params.slug)
			.maybeSingle<BlogPost>(),
		locals.viewer(),
	])

	if (err) {
		console.error('[blog] load post', err)
		throw error(500, 'Could not load the post')
	}
	if (!post) throw error(404, 'Post not found')

	return {
		post,
		isAuthor: post.author_id === viewer.user?.id,
		canReview: viewer.isSuperuser,
	}
}

export const actions = {
	publish: reviewPostAction('published'),
	reject: reviewPostAction('rejected'),
	unpublish: reviewPostAction('draft'),
} satisfies Actions
