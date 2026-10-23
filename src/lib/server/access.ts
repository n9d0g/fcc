import { ROLES, isRole, type Role } from '#lib/schemas/roles.js'
import { error, redirect, type RequestEvent } from '@sveltejs/kit'
import type { Handle } from '@sveltejs/kit/hooks'
import type { User } from '@supabase/supabase-js'

/** The person making this request and what they may do on it. */
export type Viewer = {
	user: User | null
	/** Effective Roles: a Superuser holds every Role */
	roles: Role[]
	isSuperuser: boolean
	isWorshipMember: boolean
	isBlogAuthor: boolean
}

type Policy = 'signedIn' | 'superuser' | 'worshipMember' | 'blogAuthor' | Role

/**
 * Who may reach each part of the site, enforced on every request (pages,
 * data and form actions) by `accessHandle`. The longest matching prefix wins;
 * a prefix ending in `/` matches only paths below it. Anything unmatched is
 * public. See docs/adr/0001-route-access-in-hook-table.md.
 */
const ACCESS_TABLE: Record<string, Policy> = {
	'/admin': 'superuser',
	'/admin/worship': 'worship_leader',
	'/admin/availability': 'worship_leader',
	'/admin/prayer': 'prayer_leader',
	'/ministries/praise/song-usage': 'worship_leader',
	'/ministries/praise/schedule': 'worshipMember',
	'/ministries/praise/availability': 'worshipMember',
	'/chords': 'worshipMember',
	'/blog/write/': 'blogAuthor',
	'/blog/write': 'signedIn',
	'/account': 'signedIn',
}

const SIGNED_OUT: Viewer = {
	user: null,
	roles: [],
	isSuperuser: false,
	isWorshipMember: false,
	isBlogAuthor: false,
}

type ViewerLocals = Pick<App.Locals, 'supabase' | 'safeGetSession'>

const resolveViewer = async (locals: ViewerLocals): Promise<Viewer> => {
	const { user } = await locals.safeGetSession()
	if (!user) return SIGNED_OUT

	// Memberships come from the same SQL functions RLS checks
	const [granted, worship, author] = await Promise.all([
		locals.supabase.from('user_roles').select('role').eq('user_id', user.id),
		locals.supabase.rpc('is_worship_member'),
		locals.supabase.rpc('is_blog_author'),
	])
	if (granted.error) console.error('[access] load roles', granted.error)
	if (worship.error) console.error('[access] is_worship_member', worship.error)
	if (author.error) console.error('[access] is_blog_author', author.error)

	// Mirrors public.is_admin()
	const isSuperuser = user.app_metadata?.role === 'admin'
	return {
		user,
		roles: isSuperuser
			? ROLES.map((r) => r.value)
			: (granted.data ?? []).map((r) => String(r.role)).filter(isRole),
		isSuperuser,
		isWorshipMember: worship.data === true,
		isBlogAuthor: author.data === true,
	}
}

const matches = (pathname: string, prefix: string) =>
	prefix.endsWith('/')
		? pathname.startsWith(prefix)
		: pathname === prefix || pathname.startsWith(`${prefix}/`)

/** The access table entry that applies to a path, if any. */
export const policyFor = (pathname: string): Policy | undefined => {
	let best: string | undefined
	for (const prefix of Object.keys(ACCESS_TABLE)) {
		if (matches(pathname, prefix) && prefix.length > (best?.length ?? -1)) {
			best = prefix
		}
	}
	return best ? ACCESS_TABLE[best] : undefined
}

const allows = (viewer: Viewer, policy: Policy) => {
	switch (policy) {
		case 'signedIn':
			return !!viewer.user
		case 'superuser':
			return viewer.isSuperuser
		case 'worshipMember':
			return viewer.isWorshipMember
		case 'blogAuthor':
			return viewer.isBlogAuthor
		default:
			return viewer.roles.includes(policy)
	}
}

/**
 * Signed-out visitors are sent to log in and brought back afterwards. Blog
 * writers without approval go to /blog/write, where they can ask for it;
 * everyone else gets a 404 so the page's existence isn't advertised.
 */
const deny = (url: URL, viewer: Viewer, policy: Policy): never => {
	if (!viewer.user) {
		const redirectTo = encodeURIComponent(url.pathname + url.search)
		throw redirect(303, `/login?redirectTo=${redirectTo}`)
	}
	if (policy === 'blogAuthor') throw redirect(303, '/blog/write')
	throw error(404, 'Not found')
}

/**
 * Gives every request a lazy, memoized `locals.viewer()` and enforces
 * ACCESS_TABLE. Runs after the Supabase handle.
 */
export const accessHandle: Handle = async ({ event, resolve }) => {
	let viewer: Promise<Viewer> | undefined
	event.locals.viewer = () => (viewer ??= resolveViewer(event.locals))

	const policy = policyFor(event.url.pathname)
	if (!policy) return resolve(event)

	const current = await event.locals.viewer()
	if (allows(current, policy)) return resolve(event)

	const htmlPage =
		event.request.method === 'GET' &&
		!event.isDataRequest &&
		!!current.user &&
		policy !== 'blogAuthor' &&
		event.request.headers.get('accept')?.includes('text/html')
	if (htmlPage) {
		// An error thrown from a hook skips +error.svelte for SvelteKit's bare
		// fallback page, so render the site's own 404 from a path no route has
		const notFound = await event.fetch('/__not-found')
		return new Response(notFound.body, {
			status: 404,
			headers: notFound.headers,
		})
	}
	return deny(event.url, current, policy)
}

/**
 * For checks the table can't express, such as a review action mounted on a
 * public page. Same outcomes as the table; returns the Viewer when allowed.
 */
export const requireAccess = async (
	{ locals, url }: RequestEvent,
	policy: Policy
): Promise<Viewer & { user: User }> => {
	const viewer = await locals.viewer()
	// Every policy needs a signed-in user
	if (!viewer.user || !allows(viewer, policy)) deny(url, viewer, policy)
	return viewer as Viewer & { user: User }
}

/** The signed-in user, on a route ACCESS_TABLE already restricts. */
export const signedInUser = async (locals: App.Locals) => {
	const { user } = await locals.viewer()
	if (!user) throw error(401, 'Not signed in')
	return user
}
