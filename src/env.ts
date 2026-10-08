import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars({
	PUBLIC_SUPABASE_ANON_KEY: { public: true, static: true },
	PUBLIC_SUPABASE_URL: { public: true, static: true },
	GOOGLE_RECAPTCHA_SECRET_KEY: { schema: (input) => input ?? '' },
	PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY: { public: true, static: true },
	RESEND_API_KEY: { schema: (input) => input ?? '' },
	RESEND_FROM_EMAIL: { schema: (input) => input ?? '' },
})
