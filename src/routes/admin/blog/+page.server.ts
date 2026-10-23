import type { BlogAuthorRequest, BlogPost } from '#lib/schemas/blog.js'
import { reviewAuthorAction, reviewPostAction } from '#lib/server/blog.js'
import { error } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

type PostRow = Pick<
	BlogPost,
	| 'id'
	| 'slug'
	| 'title'
	| 'excerpt'
	| 'body'
	| 'author_name'
	| 'status'
	| 'submitted_at'
	| 'published_at'
>

export const load: PageServerLoad = async (event) => {
	const { supabase } = event.locals

	const [authors, posts] = await Promise.all([
		supabase
			.from('blog_author_requests')
			.select('*')
			.order('created_at', { ascending: false })
			.returns<BlogAuthorRequest[]>(),
		// Drafts are private to their authors until submitted
		supabase
			.from('blog_posts')
			.select(
				'id, slug, title, excerpt, body, author_name, status, submitted_at, published_at'
			)
			.in('status', ['pending', 'published'])
			.order('submitted_at', { ascending: false })
			.returns<PostRow[]>(),
	])

	const err = authors.error ?? posts.error
	if (err) {
		console.error('[admin] load blog', err)
		throw error(500, 'Could not load the blog queue')
	}

	return { authors: authors.data ?? [], posts: posts.data ?? [] }
}

export const actions = {
	approveAuthor: reviewAuthorAction('approved'),
	rejectAuthor: reviewAuthorAction('rejected'),
	publish: reviewPostAction('published'),
	reject: reviewPostAction('rejected'),
	unpublish: reviewPostAction('draft'),
} satisfies Actions
