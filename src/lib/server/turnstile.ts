// Server-side Turnstile check for forms Supabase doesn't cover (the auth forms
// pass their token to Supabase, which checks it itself).

const SITEVERIFY_URL =
	'https://challenges.cloudflare.com/turnstile/v0/siteverify'

type SiteverifyResult = {
	success: boolean
	hostname?: string
	action?: string
	'error-codes'?: string[]
}

type VerifyOptions = {
	/** The cf-turnstile-response value the form posted. */
	token: string
	secret: string
	/** The visitor's IP, which Cloudflare uses as an extra signal. */
	remoteip?: string
	/** Prefix for log lines, e.g. "[contact]". */
	logPrefix: string
}

/** True when Cloudflare confirms the token. Logs why when it doesn't. */
export async function verifyTurnstile({
	token,
	secret,
	remoteip,
	logPrefix,
}: VerifyOptions) {
	if (!token) {
		console.warn(`${logPrefix} turnstile: no token submitted`)
		return false
	}
	if (!secret) {
		console.error(`${logPrefix} turnstile: TURNSTILE_SECRET_KEY is not set`)
		return false
	}

	const body = new URLSearchParams({ secret, response: token })
	if (remoteip) body.set('remoteip', remoteip)

	const res = await fetch(SITEVERIFY_URL, { method: 'POST', body })
	if (!res.ok) {
		console.error(`${logPrefix} turnstile: siteverify HTTP`, res.status)
		return false
	}

	const result: SiteverifyResult = await res.json()

	// Log Cloudflare's verdict (never the token) so failures are diagnosable
	if (!result.success) console.warn(`${logPrefix} turnstile rejected`, result)

	return result.success
}
