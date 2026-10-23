import BlogAuthorRequestEmail from '#lib/emails/BlogAuthorRequest.svelte'
import { blogAuthorRequestSchema, type BlogPost } from '#lib/schemas/blog.js'
import { signedInUser } from '#lib/server/access.js'
import { torontoTimestamp } from '#lib/schemas/worship-availability.js'
import { loadAuthor } from '#lib/server/blog.js'
import { trySend } from '#lib/server/notifier.js'
import { fail } from '@sveltejs/kit'
import { z } from 'zod'
import type { Actions, PageServerLoad } from './$types'

type Values = { fullName: string; message: string }
type FieldErrors = Partial<Record<keyof Values, string>>

const failure = (
	status: number,
	values: Values,
	errors: FieldErrors = {},
	message?: string
) => fail(status, { values, errors, message })

export const load: PageServerLoad = async (event) => {
	const user = await signedInUser(event.locals)
	const [{ request }, { isBlogAuthor }] = await Promise.all([
		loadAuthor(event),
		event.locals.viewer(),
	])

	const displayName =
		typeof user.user_metadata?.display_name === 'string'
			? user.user_metadata.display_name
			: ''

	if (!isBlogAuthor) return { request, displayName, posts: [] }

	const { data: posts, error } = await event.locals.supabase
		.from('blog_posts')
		.select('id, slug, title, status, review_note, updated_at, published_at')
		.eq('author_id', user.id)
		.order('updated_at', { ascending: false })
		.returns<
			Pick<
				BlogPost,
				| 'id'
				| 'slug'
				| 'title'
				| 'status'
				| 'review_note'
				| 'updated_at'
				| 'published_at'
			>[]
		>()

	if (error) console.error('[blog] load own posts', error)

	return { request, displayName, posts: posts ?? [] }
}

export const actions = {
	requestAccess: async (event) => {
		const formData = await event.request.formData()
		const values: Values = {
			fullName: String(formData.get('fullName') ?? ''),
			message: String(formData.get('message') ?? ''),
		}

		const user = await signedInUser(event.locals)
		if (!user.email) {
			return failure(401, values, {}, 'Please log in first.')
		}

		const parsed = blogAuthorRequestSchema.safeParse(values)
		if (!parsed.success) {
			const { fieldErrors } = z.flattenError(parsed.error)
			return failure(400, values, {
				fullName: fieldErrors.fullName?.[0],
				message: fieldErrors.message?.[0],
			})
		}

		const { error } = await event.locals.supabase
			.from('blog_author_requests')
			.insert({
				user_id: user.id,
				email: user.email,
				full_name: parsed.data.fullName,
				message: parsed.data.message || null,
			})

		if (error) {
			// 23505: unique violation on user_id
			const duplicate = error.code === '23505'
			if (!duplicate) console.error('[blog] request access', error)
			return failure(
				duplicate ? 409 : 500,
				values,
				{},
				duplicate
					? 'You have already requested access.'
					: "We couldn't send your request. Please try again later."
			)
		}

		// Best effort: the request is saved and listed on /admin/blog either way
		await trySend({
			to: 'superusers',
			replyTo: user.email,
			subject: `Blog author request: ${parsed.data.fullName}`,
			template: BlogAuthorRequestEmail,
			props: {
				fullName: parsed.data.fullName,
				email: user.email,
				message: parsed.data.message,
				reviewUrl: `${event.url.origin}/admin/blog`,
				submittedAt: torontoTimestamp(),
			},
		})

		return { success: true as const }
	},
} satisfies Actions
