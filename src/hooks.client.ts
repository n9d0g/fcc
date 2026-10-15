import { PUBLIC_SENTRY_DSN, PUBLIC_SENTRY_ENVIRONMENT } from '$app/env/public'
import * as Sentry from '@sentry/sveltekit'

Sentry.init({
	dsn: PUBLIC_SENTRY_DSN,
	enabled: !!PUBLIC_SENTRY_DSN,
	environment: PUBLIC_SENTRY_ENVIRONMENT,
	tracesSampleRate: PUBLIC_SENTRY_ENVIRONMENT === 'production' ? 0.1 : 1.0,
})

export const handleError = Sentry.handleErrorWithSentry()
