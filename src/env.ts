import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars({
	PUBLIC_SUPABASE_ANON_KEY: { public: true, static: true },
	PUBLIC_SUPABASE_URL: { public: true, static: true },
	// Cloudflare Turnstile widget for the auth and contact forms. Optional so
	// fork PR builds work; without it the widget doesn't render.
	PUBLIC_TURNSTILE_SITE_KEY: {
		public: true,
		static: true,
		schema: (input) => input ?? '',
	},
	// Sentry is disabled when the DSN is empty
	PUBLIC_SENTRY_DSN: {
		public: true,
		static: true,
		schema: (input) => input ?? '',
	},
	PUBLIC_SENTRY_ENVIRONMENT: {
		public: true,
		static: true,
		schema: (input) => input ?? 'development',
	},
	// The same widget's secret. Supabase holds its own copy for the auth forms
	// (Auth → Bot and Abuse Protection); this one checks contact form tokens.
	// Empty means every contact submission is rejected.
	TURNSTILE_SECRET_KEY: { schema: (input) => input ?? '' },
	RESEND_API_KEY: { schema: (input) => input ?? '' },
	RESEND_FROM_EMAIL: { schema: (input) => input ?? '' },
	// Server-only. Used for event subscribers, who don't have accounts
	SUPABASE_SERVICE_ROLE_KEY: { schema: (input) => input ?? '' },
	// Shared secret Sanity sends with the new-event webhook
	SANITY_WEBHOOK_SECRET: { schema: (input) => input ?? '' },
	// Shared secret the daily GitHub Action sends to /api/cron/*
	CRON_SECRET: { schema: (input) => input ?? '' },
})
