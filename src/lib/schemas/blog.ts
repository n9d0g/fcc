import { z } from 'zod'

export const BLOG_LIMITS = {
	title: 120,
	excerpt: 300,
	body: 20000,
	fullName: 100,
	message: 1000,
	reviewNote: 1000,
} as const

export const blogAuthorRequestSchema = z.object({
	fullName: z
		.string()
		.trim()
		.min(1, { error: 'Please enter your name.' })
		.max(BLOG_LIMITS.fullName, {
			error: `Name must be ${BLOG_LIMITS.fullName} characters or fewer.`,
		}),
	message: z
		.string()
		.trim()
		.max(BLOG_LIMITS.message, {
			error: `Message must be ${BLOG_LIMITS.message} characters or fewer.`,
		}),
})

export const blogPostSchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, { error: 'Please give your post a title.' })
		.max(BLOG_LIMITS.title, {
			error: `Title must be ${BLOG_LIMITS.title} characters or fewer.`,
		}),
	excerpt: z
		.string()
		.trim()
		.max(BLOG_LIMITS.excerpt, {
			error: `Summary must be ${BLOG_LIMITS.excerpt} characters or fewer.`,
		}),
	body: z
		.string()
		.trim()
		.min(1, { error: 'Your post needs some content.' })
		.max(BLOG_LIMITS.body, {
			error: `Posts must be ${BLOG_LIMITS.body.toLocaleString()} characters or fewer.`,
		}),
})

export type BlogPostStatus = 'draft' | 'pending' | 'published' | 'rejected'

// Row shape of public.blog_posts (supabase/migrations)
export type BlogPost = {
	id: string
	author_id: string
	author_name: string
	slug: string
	title: string
	excerpt: string
	body: string
	status: BlogPostStatus
	review_note: string | null
	created_at: string
	updated_at: string
	submitted_at: string | null
	published_at: string | null
	reviewed_at: string | null
	reviewed_by: string | null
}

// Row shape of public.blog_author_requests
export type BlogAuthorRequest = {
	id: string
	user_id: string
	email: string
	full_name: string
	message: string | null
	status: 'pending' | 'approved' | 'rejected'
	created_at: string
	reviewed_at: string | null
	reviewed_by: string | null
}

export const POST_STATUS_LABEL: Record<BlogPostStatus, string> = {
	draft: 'Draft',
	pending: 'Awaiting approval',
	published: 'Published',
	rejected: 'Changes requested',
}

/**
 * URL slug from a title plus a short random suffix, so two posts with the
 * same title never collide: "Hello, World!" -> "hello-world-k3x9"
 */
export const slugify = (title: string, suffix = randomSuffix()) => {
	const base = title
		.normalize('NFKD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 60)
		.replace(/-+$/, '')
	return base ? `${base}-${suffix}` : suffix
}

const randomSuffix = () =>
	Array.from(crypto.getRandomValues(new Uint8Array(4)), (b) =>
		'abcdefghijklmnopqrstuvwxyz0123456789'.charAt(b % 36)
	).join('')

type BodyBlock =
	| { type: 'heading'; text: string }
	| { type: 'paragraph'; lines: string[] }
	| { type: 'list'; items: string[] }

/**
 * Splits a post body into blocks. Deliberately tiny: blank lines separate
 * paragraphs, "## " starts a heading and "- " starts a bullet. Everything is
 * rendered as text, so authors can't inject markup.
 */
export const parseBody = (body: string): BodyBlock[] =>
	body
		.replace(/\r\n?/g, '\n')
		.split(/\n\s*\n/)
		.map((chunk) => chunk.trim())
		.filter(Boolean)
		.flatMap((chunk): BodyBlock[] => {
			const lines = chunk.split('\n').map((l) => l.trim())
			if (lines.every((l) => /^[-*] /.test(l))) {
				return [{ type: 'list', items: lines.map((l) => l.slice(2).trim()) }]
			}
			if (/^#{1,3} /.test(lines[0])) {
				const heading: BodyBlock = {
					type: 'heading',
					text: lines[0].replace(/^#+ /, ''),
				}
				const rest = lines.slice(1)
				return rest.length
					? [heading, { type: 'paragraph', lines: rest }]
					: [heading]
			}
			return [{ type: 'paragraph', lines }]
		})

/** The author's summary, or the start of the post when they didn't write one. */
export const postExcerpt = (
	post: Pick<BlogPost, 'excerpt' | 'body'>,
	max = 200
) => {
	if (post.excerpt) return post.excerpt
	const text = parseBody(post.body)
		.filter((b) => b.type === 'paragraph')
		.flatMap((b) => b.lines)
		.join(' ')
	return text.length > max
		? `${text.slice(0, max).replace(/\s+\S*$/, '')}…`
		: text
}

/** Rough reading time at 200 words a minute. */
export const readingMinutes = (body: string) =>
	Math.max(1, Math.round(body.trim().split(/\s+/).length / 200))
