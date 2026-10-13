// Where mail to @fcccanada.ca goes. Edit this file, then `pnpm email:deploy`.
//
// Every destination must be verified first in the Cloudflare dashboard:
// Email → Email Routing → Destination addresses. Never forward to an
// @fcccanada.ca address, or the message will loop back here.

/** Address before the @ (lowercase) → where to forward it. */
export const ROUTES: Record<string, string[]> = {
	hello: ['nate@njil.dev'],
}

/** Senders to refuse: a full address ("spam@example.com") or a whole domain ("@example.com"). */
export const BLOCKED_SENDERS: string[] = []

export type Decision =
	| { action: 'forward'; alias: string; to: string[] }
	| { action: 'reject'; reason: string }

/**
 * Decides what to do with one incoming message. Plus-addressing works, so
 * hello+events@fcccanada.ca goes wherever hello@ goes.
 */
export function route(to: string, from: string): Decision {
	const sender = from.trim().toLowerCase()
	const blocked = BLOCKED_SENDERS.some((entry) => {
		const rule = entry.trim().toLowerCase()
		return rule.startsWith('@') ? sender.endsWith(rule) : sender === rule
	})
	if (blocked) return { action: 'reject', reason: 'Message rejected' }

	const alias = to.trim().toLowerCase().split('@')[0].split('+')[0]
	const destinations = ROUTES[alias]
	if (!destinations?.length)
		return { action: 'reject', reason: 'Address not found' }

	return { action: 'forward', alias, to: destinations }
}
