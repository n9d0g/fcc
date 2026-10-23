import {
	createBrowserClient,
	createServerClient,
	isBrowser,
} from '@supabase/ssr'
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$app/env/public'
import { isPageId, pageFor } from '#lib/config/pages.js'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({
	data,
	depends,
	fetch,
	route,
	url,
}) => {
	depends('supabase:auth')

	const supabase = isBrowser()
		? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: { fetch },
			})
		: createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: { fetch },
				cookies: {
					getAll() {
						return data.cookies
					},
				},
			})

	return {
		url: url.pathname,
		// Pages with a dynamic title override this from their own load
		pageMeta: isPageId(route.id) ? pageFor(route.id) : undefined,
		banner: data.banner,
		supabase,
		user: data.user,
		isSuperuser: data.isSuperuser,
		isBlogAuthor: data.isBlogAuthor,
		roles: data.roles,
		isWorshipMember: data.isWorshipMember,
	}
}
