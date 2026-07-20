import { createServerClient } from '@supabase/ssr'
import {
	PUBLIC_SUPABASE_ANON_KEY,
	PUBLIC_SUPABASE_URL,
} from '$env/static/public'
import type { Cookies } from '@sveltejs/kit'

export function createSupabaseServerClient(cookies: Cookies) {
	return createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => cookies.getAll(),
			setAll: (cookiesToSet) => {
				try {
					cookiesToSet.forEach(({ name, value, options }) => {
						cookies.set(name, value, { ...options, path: '/' })
					})
				} catch (error) {
					console.warn('[supabase] Failed to set auth cookies:', error)
				}
			},
		},
	})
}
