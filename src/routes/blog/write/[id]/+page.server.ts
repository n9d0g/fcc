import { renderEmail } from '#lib/emails/render.server.js'
import BlogPostSubmittedEmail from '#lib/emails/BlogPostSubmitted.svelte'
import {
	blogPostSchema,
	postExcerpt,
	slugify,
	type BlogPost,
} from '#lib/schemas/blog.js'
import { displayNameOf } from '#lib/schemas/account.js'
import { signedInUser } from '#lib/server/access.js'
import { emailAdmins, loadAuthor, timestamp } from '#lib/server/blog.js'
import { error, fail, redirect, type RequestEvent } from '@sveltejs/kit'
import { z } from 'zod'
import type { Actions, PageServerLoad } from './$types'

type Values = { title: string; excerpt: string; body: string }
type FieldErrors = Partial<Record<keyof Values, string>>

const failure = (
	status: number,
	values: Values | undefined,
	errors: FieldErrors = {},
	message?: string
) => fail(status, { values, errors, message })

// The author's own post, or null for /blog/write/new
const loadOwnPost = async (event: RequestEvent, userId: string) => {
	const id = event.params.id
	if (id === 'new') return null

	const { data: post, error: err } = await event.locals.supabase
		.from('blog_posts')
		.select('*')
		.eq('id', id)
		.eq('author_id', userId)
		.maybeSingle<BlogPost>()

	// 22P02: malformed uuid in the URL
	if (err && err.code !== '22P02') {
		console.error('[blog] load post for editing', err)
		throw error(500, 'Could not load the post')
	}
	if (!post) throw error(404, 'Post not found')
	return post
}

export const load: PageServerLoad = async (event) => {
	const user = await signedInUser(event.locals)
	return { post: await loadOwnPost(event, user.id) }
}

export const actions = {
	save: async (event) => {
		const user = await signedInUser(event.locals)
		const existing = await loadOwnPost(event, user.id)
		if (existing?.status === 'published') {
			return failure(
				409,
				undefined,
				{},
				'Published posts can no longer be edited.'
			)
		}

		const formData = await event.request.formData()
		const submitting = formData.get('intent') === 'submit'
		const values: Values = {
			title: String(formData.get('title') ?? ''),
			excerpt: String(formData.get('excerpt') ?? ''),
			body: String(formData.get('body') ?? ''),
		}

		const parsed = blogPostSchema.safeParse(values)
		if (!parsed.success) {
			const { fieldErrors } = z.flattenError(parsed.error)
			return failure(400, values, {
				title: fieldErrors.title?.[0],
				excerpt: fieldErrors.excerpt?.[0],
				body: fieldErrors.body?.[0],
			})
		}

		const fields = {
			...parsed.data,
			status: submitting ? ('pending' as const) : ('draft' as const),
		}
		const { supabase } = event.locals
		const { data: saved, error: err } = existing
			? await supabase
					.from('blog_posts')
					.update(fields)
					.eq('id', existing.id)
					.select('id, slug')
					.single()
			: await supabase
					.from('blog_posts')
					.insert({
						...fields,
						author_id: user.id,
						slug: slugify(parsed.data.title),
					})
					.select('id, slug')
					.single()

		if (err) {
			console.error('[blog] save post', err)
			return failure(
				500,
				values,
				{},
				"We couldn't save your post. Please try again."
			)
		}

		if (submitting) {
			const { request } = await loadAuthor(event)
			const email = request?.email ?? user.email ?? ''
			const { html, text } = await renderEmail(BlogPostSubmittedEmail, {
				authorName: request?.full_name ?? displayNameOf(user),
				email,
				title: parsed.data.title,
				excerpt: postExcerpt(parsed.data),
				reviewUrl: `${event.url.origin}/blog/${saved.slug}`,
				submittedAt: timestamp(),
			})
			await emailAdmins(event, {
				subject: `Blog post for approval: ${parsed.data.title}`,
				replyTo: email,
				html,
				text,
			})
		}

		throw redirect(
			303,
			`/blog/write?saved=${submitting ? 'submitted' : 'draft'}`
		)
	},

	delete: async (event) => {
		const user = await signedInUser(event.locals)
		const existing = await loadOwnPost(event, user.id)
		if (!existing) throw redirect(303, '/blog/write')

		const { error: err } = await event.locals.supabase
			.from('blog_posts')
			.delete()
			.eq('id', existing.id)

		if (err) {
			console.error('[blog] delete post', err)
			return failure(
				500,
				undefined,
				{},
				"We couldn't delete your post. Please try again."
			)
		}

		throw redirect(303, '/blog/write?saved=deleted')
	},
} satisfies Actions
