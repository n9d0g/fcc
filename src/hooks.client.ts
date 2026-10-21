import { PUBLIC_SENTRY_DSN, PUBLIC_SENTRY_ENVIRONMENT } from '$app/env/public'
import * as Sentry from '@sentry/sveltekit'

Sentry.init({
	dsn: PUBLIC_SENTRY_DSN,
	enabled: !!PUBLIC_SENTRY_DSN,
	environment: PUBLIC_SENTRY_ENVIRONMENT,
	tracesSampleRate: PUBLIC_SENTRY_ENVIRONMENT === 'production' ? 0.1 : 1.0,
	integrations: [Sentry.replayIntegration()],
	replaysSessionSampleRate:
		PUBLIC_SENTRY_ENVIRONMENT === 'production' ? 0.1 : 1.0,
	replaysOnErrorSampleRate: 1.0,
	// client-side network failures (offline, aborted, blocked by extensions);
	// real server errors still surface via the server hooks with a status code
	ignoreErrors: [
		/^Load failed/, // Safari / WebKit
		/^Failed to fetch/, // Chromium
		/^NetworkError when attempting to fetch resource/, // Firefox
	],
})

export const handleError = Sentry.handleErrorWithSentry()
