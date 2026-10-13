import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars({
	PUBLIC_SUPABASE_ANON_KEY: { public: true, static: true },
	PUBLIC_SUPABASE_URL: { public: true, static: true },
	GOOGLE_RECAPTCHA_SECRET_KEY: { schema: (input) => input ?? '' },
	PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY: { public: true, static: true },
	RESEND_API_KEY: { schema: (input) => input ?? '' },
	RESEND_FROM_EMAIL: { schema: (input) => input ?? '' },
	// Server-only. Used for event subscribers, who don't have accounts
	SUPABASE_SERVICE_ROLE_KEY: { schema: (input) => input ?? '' },
	// Shared secret Sanity sends with the new-event webhook
	SANITY_WEBHOOK_SECRET: { schema: (input) => input ?? '' },
})
