import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL } from '$app/env/public'
import { SUPABASE_SERVICE_ROLE_KEY } from '$app/env/private'

let admin: SupabaseClient | undefined

/**
 * Service-role client that bypasses RLS. Only for tables nobody signs in to
 * use (event subscribers); everything else goes through locals.supabase so
 * RLS applies as the signed-in user.
 */
export function getSupabaseAdmin() {
	if (!admin) {
		if (!SUPABASE_SERVICE_ROLE_KEY) {
			throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set')
		}
		admin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
			auth: { persistSession: false, autoRefreshToken: false },
		})
	}
	return admin
}
