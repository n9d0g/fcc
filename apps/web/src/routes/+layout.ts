import {
	createBrowserClient,
	createServerClient,
	isBrowser,
} from '@supabase/ssr'
import {
	PUBLIC_SUPABASE_ANON_KEY,
	PUBLIC_SUPABASE_URL,
} from '$env/static/public'
import { client } from '$lib/config'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ data, depends, fetch, url }) => {
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

	const banner = await client.fetch(`*[_type == "banner"]`)

	return {
		url: url.pathname,
		banner: banner[0],
		supabase,
		user: data.user,
	}
}
