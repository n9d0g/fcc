import { describe, expect, it } from 'vite-plus/test'
import { isHttpError, isRedirect, type RequestEvent } from '@sveltejs/kit'
import type { User } from '@supabase/supabase-js'
import { accessHandle, requireAccess } from './access.js'

type Who =
	| 'signedOut'
	| 'member'
	| 'prayerLeader'
	| 'worshipLeader'
	| 'worshipMember'
	| 'blogAuthor'
	| 'superuser'

// What the Supabase client on locals answers for each kind of Viewer
const ACCOUNTS: Record<
	Who,
	{ roles?: string[]; worship?: boolean; author?: boolean; superuser?: boolean }
> = {
	signedOut: {},
	member: {},
	prayerLeader: { roles: ['prayer_leader'] },
	worshipLeader: { roles: ['worship_leader'], worship: true },
	worshipMember: { worship: true },
	blogAuthor: { author: true },
	superuser: { superuser: true, worship: true, author: true },
}

const fakeEvent = (
	who: Who,
	path: string,
	{ method = 'GET', accept = 'text/html', isDataRequest = false } = {}
) => {
	const account = ACCOUNTS[who]
	const queries: string[] = []
	const user =
		who === 'signedOut'
			? null
			: ({
					id: 'u1',
					app_metadata: account.superuser ? { role: 'admin' } : {},
				} as unknown as User)
	const supabase = {
		from: (table: string) => ({
			select: () => ({
				eq: async () => {
					queries.push(table)
					return {
						data: (account.roles ?? []).map((role) => ({ role })),
						error: null,
					}
				},
			}),
		}),
		rpc: async (fn: string) => {
			queries.push(fn)
			const data =
				fn === 'is_worship_member'
					? !!account.worship
					: fn === 'is_blog_author'
						? !!account.author
						: null
			return { data, error: null }
		},
	}
	const url = new URL(`https://fcccanada.ca${path}`)
	const event = {
		url,
		isDataRequest,
		request: new Request(url, { method, headers: { accept } }),
		locals: {
			supabase,
			safeGetSession: async () => ({ session: user ? {} : null, user }),
		},
		// Stands in for the site's rendered 404 page
		fetch: async () => new Response('site 404', { status: 404 }),
	} as unknown as RequestEvent
	return { event, queries }
}

/** What the hook did: let the request through, redirect, 404, or serve the site 404. */
const outcome = async (
	who: Who,
	path: string,
	options?: Parameters<typeof fakeEvent>[2]
) => {
	const { event } = fakeEvent(who, path, options)
	try {
		const response = await accessHandle({
			event,
			resolve: async () => new Response('page'),
		})
		const body = await response.text()
		return body === 'page' ? 'allowed' : `${response.status} ${body}`
	} catch (e) {
		if (isRedirect(e)) return `redirect ${e.location}`
		if (isHttpError(e)) return `error ${e.status}`
		throw e
	}
}

describe('accessHandle', () => {
	it('lets anyone through to public pages', async () => {
		expect(await outcome('signedOut', '/')).toBe('allowed')
		expect(await outcome('signedOut', '/ministries/praise/join')).toBe(
			'allowed'
		)
		expect(await outcome('signedOut', '/blog/some-post')).toBe('allowed')
	})

	it('sends signed-out visitors to log in and back', async () => {
		expect(await outcome('signedOut', '/admin/prayer?week=2')).toBe(
			`redirect /login?redirectTo=${encodeURIComponent('/admin/prayer?week=2')}`
		)
		expect(await outcome('signedOut', '/account')).toBe(
			'redirect /login?redirectTo=%2Faccount'
		)
	})

	it('gives each part of the site its own policy', async () => {
		const cases: [string, Who[]][] = [
			['/admin/users', ['superuser']],
			['/admin/worship-requests/abc', ['superuser']],
			['/admin/worship/abc', ['worshipLeader', 'superuser']],
			['/admin/availability', ['worshipLeader', 'superuser']],
			['/admin/prayer', ['prayerLeader', 'superuser']],
			['/ministries/praise/song-usage', ['worshipLeader', 'superuser']],
			[
				'/ministries/praise/schedule',
				['worshipMember', 'worshipLeader', 'superuser'],
			],
			['/chords', ['worshipMember', 'worshipLeader', 'superuser']],
			['/blog/write/new', ['blogAuthor', 'superuser']],
			[
				'/blog/write',
				[
					'member',
					'prayerLeader',
					'worshipLeader',
					'worshipMember',
					'blogAuthor',
					'superuser',
				],
			],
		]
		const everyone: Who[] = [
			'member',
			'prayerLeader',
			'worshipLeader',
			'worshipMember',
			'blogAuthor',
			'superuser',
		]
		for (const [path, allowed] of cases) {
			for (const who of everyone) {
				const result = await outcome(who, path)
				expect([path, who, result === 'allowed']).toEqual([
					path,
					who,
					allowed.includes(who),
				])
			}
		}
	})

	it("doesn't let a shorter prefix shadow a longer path segment", async () => {
		// /admin/worship-requests falls under /admin, not /admin/worship
		expect(await outcome('worshipLeader', '/admin/worship-requests')).not.toBe(
			'allowed'
		)
	})

	it('serves the site 404 to signed-in viewers without access', async () => {
		expect(await outcome('member', '/admin/users')).toBe('404 site 404')
	})

	it('throws a 404 for data requests and form actions', async () => {
		expect(
			await outcome('member', '/admin/users', { isDataRequest: true })
		).toBe('error 404')
		expect(
			await outcome('member', '/admin/users', {
				method: 'POST',
				accept: 'application/json',
			})
		).toBe('error 404')
	})

	it('sends signed-in writers without approval to request it', async () => {
		expect(await outcome('member', '/blog/write/new')).toBe(
			'redirect /blog/write'
		)
	})

	it('resolves the Viewer once per request, and not at all for public pages', async () => {
		const gated = fakeEvent('superuser', '/admin/users')
		await accessHandle({
			event: gated.event,
			resolve: async (event) => {
				await event.locals.viewer()
				await event.locals.viewer()
				return new Response('page')
			},
		})
		expect(gated.queries.sort()).toEqual([
			'is_blog_author',
			'is_worship_member',
			'user_roles',
		])

		const open = fakeEvent('superuser', '/')
		await accessHandle({
			event: open.event,
			resolve: async () => new Response('page'),
		})
		expect(open.queries).toEqual([])
	})

	it('gives superusers every role', async () => {
		const { event } = fakeEvent('superuser', '/')
		await accessHandle({ event, resolve: async () => new Response('page') })
		expect((await event.locals.viewer()).roles).toEqual([
			'prayer_leader',
			'worship_leader',
		])
	})
})

describe('requireAccess', () => {
	const check = async (who: Who) => {
		const { event } = fakeEvent(who, '/blog/a-post?/publish', {
			method: 'POST',
		})
		await accessHandle({ event, resolve: async () => new Response('page') })
		try {
			return (await requireAccess(event, 'superuser')).user.id
		} catch (e) {
			if (isRedirect(e)) return `redirect ${e.location}`
			if (isHttpError(e)) return `error ${e.status}`
			throw e
		}
	}

	it('applies a policy on a public route, with the same outcomes', async () => {
		expect(await check('superuser')).toBe('u1')
		expect(await check('blogAuthor')).toBe('error 404')
		expect(await check('signedOut')).toBe(
			`redirect /login?redirectTo=${encodeURIComponent('/blog/a-post?/publish')}`
		)
	})
})
