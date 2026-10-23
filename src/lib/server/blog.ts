import { getResend, getResendFromEmail } from '#lib/resend.server.js'
import type { BlogAuthorRequest, BlogPost } from '#lib/schemas/blog.js'
import { BLOG_LIMITS } from '#lib/schemas/blog.js'
import { requireAccess } from '#lib/server/access.js'
import { fail, type RequestEvent } from '@sveltejs/kit'

// What post lists need; the body is only used for excerpts and reading time
type PostSummary = Pick<
	BlogPost,
	'id' | 'slug' | 'title' | 'excerpt' | 'body' | 'author_name' | 'published_at'
>

const POST_SUMMARY_COLUMNS =
	'id, slug, title, excerpt, body, author_name, published_at'

/** Latest published posts, for the blog index and the home page. */
export const loadPublishedPosts = async (
	{ locals }: RequestEvent,
	limit: number
) => {
	const { data, error } = await locals.supabase
		.from('blog_posts')
		.select(POST_SUMMARY_COLUMNS)
		.eq('status', 'published')
		.order('published_at', { ascending: false })
		.limit(limit)
		.returns<PostSummary[]>()

	if (error) throw error
	return data
}

export const timestamp = () =>
	new Date().toLocaleString('en-CA', {
		timeZone: 'America/Toronto',
		dateStyle: 'medium',
		timeStyle: 'short',
	})

/** The signed-in user and their author request, if any. */
export const loadAuthor = async ({ locals }: RequestEvent) => {
	const { user } = await locals.viewer()
	if (!user) return { user: null, request: null }

	const { data: request, error } = await locals.supabase
		.from('blog_author_requests')
		.select('*')
		.eq('user_id', user.id)
		.maybeSingle<BlogAuthorRequest>()

	if (error) console.error('[blog] load author request', error)

	return { user, request }
}

// Best effort: whatever triggered the email is already saved and listed on
// /admin/blog, so a failed notification is logged rather than shown.
export async function emailAdmins(
	{ locals }: RequestEvent,
	email: { subject: string; html: string; text: string; replyTo: string }
) {
	try {
		const { data, error: rpcError } = await locals.supabase.rpc('admin_emails')
		if (rpcError) throw rpcError
		const admins = data as string[] | null
		if (!admins?.length) {
			console.warn('[blog] no admins to notify')
			return
		}

		const { error } = await getResend().emails.send({
			from: `Freedom in Christ Church <${getResendFromEmail()}>`,
			to: admins,
			...email,
		})
		if (error) console.error('[blog] resend error', error)
	} catch (e) {
		console.error('[blog] notify', e)
	}
}

/** Admin form action that approves or rejects an author request. */
export const reviewAuthorAction =
	(status: 'approved' | 'rejected') => async (event: RequestEvent) => {
		const { user } = await requireAccess(event, 'superuser')
		const id = String((await event.request.formData()).get('id') ?? '')
		if (!id) return fail(400, { message: 'Missing request id.' })

		const { data, error } = await event.locals.supabase
			.from('blog_author_requests')
			.update({
				status,
				reviewed_at: new Date().toISOString(),
				reviewed_by: user.id,
			})
			.eq('id', id)
			.select('id')

		if (error) {
			console.error(`[admin] ${status} blog author`, error)
			return fail(500, { message: 'Could not update the request.' })
		}
		if (!data?.length)
			return fail(404, { message: 'That request no longer exists.' })

		return { kind: 'author' as const, status }
	}

/**
 * Admin form action that publishes, rejects (with an optional note for the
 * author) or unpublishes a post back to a draft.
 */
export const reviewPostAction =
	(status: 'published' | 'rejected' | 'draft') =>
	async (event: RequestEvent) => {
		const { user } = await requireAccess(event, 'superuser')
		const formData = await event.request.formData()
		const id = String(formData.get('id') ?? '')
		const note = String(formData.get('note') ?? '')
			.trim()
			.slice(0, BLOG_LIMITS.reviewNote)
		if (!id) return fail(400, { message: 'Missing post id.' })

		const { data, error } = await event.locals.supabase
			.from('blog_posts')
			.update({
				status,
				review_note: status === 'rejected' ? note || null : null,
				reviewed_at: new Date().toISOString(),
				reviewed_by: user.id,
			})
			.eq('id', id)
			.select('id')

		if (error) {
			console.error(`[admin] ${status} blog post`, error)
			return fail(500, { message: 'Could not update the post.' })
		}
		if (!data?.length)
			return fail(404, { message: 'That post no longer exists.' })

		return { kind: 'post' as const, status }
	}
