import { PUBLIC_SENTRY_DSN, PUBLIC_SENTRY_ENVIRONMENT } from '$app/env/public'
import {
	handleErrorWithSentry,
	initCloudflareSentryHandle,
	sentryHandle,
} from '@sentry/sveltekit'
import { type Handle, sequence } from '@sveltejs/kit/hooks'
import { createSupabaseServerClient } from '#lib/supabase/server.js'

const supabaseHandle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient(event.cookies)

	event.locals.safeGetSession = async () => {
		const {
			data: { session },
		} = await event.locals.supabase.auth.getSession()

		if (!session) {
			return { session: null, user: null }
		}

		const {
			data: { user },
			error,
		} = await event.locals.supabase.auth.getUser()

		if (error) {
			return { session: null, user: null }
		}

		return { session, user }
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version'
		},
	})
}

export const handle = sequence(
	initCloudflareSentryHandle({
		dsn: PUBLIC_SENTRY_DSN,
		enabled: !!PUBLIC_SENTRY_DSN,
		environment: PUBLIC_SENTRY_ENVIRONMENT,
		tracesSampleRate: PUBLIC_SENTRY_ENVIRONMENT === 'production' ? 0.1 : 1.0,
	}),
	sentryHandle(),
	supabaseHandle
)

export const handleError = handleErrorWithSentry()
