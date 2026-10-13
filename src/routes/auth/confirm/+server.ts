import { redirect } from '@sveltejs/kit'
import type { EmailOtpType } from '@supabase/supabase-js'

// Opened from the link in the "Change email address" email
// (SupabaseChangeEmail.svelte). With Supabase's "secure email change" on, both
// the old and new address get a link, and the change applies once both are
// pressed; until then the user still has a pending new_email.
export const GET = async ({ url, locals }) => {
	const tokenHash = url.searchParams.get('token_hash')
	const type = url.searchParams.get('type') as EmailOtpType | null

	if (!tokenHash || type !== 'email_change') {
		throw redirect(303, '/account?email=invalid')
	}

	const { data, error } = await locals.supabase.auth.verifyOtp({
		token_hash: tokenHash,
		type,
	})

	if (error) {
		console.error('[auth confirm]', error)
		throw redirect(303, '/account?email=invalid')
	}

	throw redirect(
		303,
		`/account?email=${data.user?.new_email ? 'partial' : 'changed'}`
	)
}
