import { RESEND_API_KEY, RESEND_FROM_EMAIL } from '$app/env/private'
import { church } from '#lib/config/seo.js'
import { renderEmail } from '#lib/emails/render.server.js'
import { getSupabaseAdmin } from '#lib/supabase/admin.server.js'
import type { User } from '@supabase/supabase-js'
import { Resend } from 'resend'
import type { Component, ComponentProps } from 'svelte'

/** Named inboxes, so their addresses live in one place. */
const INBOXES = {
	/** New accounts, Worship team requests and copies of contact messages */
	requests: 'nate@njil.dev',
	contact: church.email,
}

export type Recipient =
	| 'superusers'
	| 'worshipLeaders'
	| { inbox: keyof typeof INBOXES }
	/** A plain email address */
	| string

type Email<C extends Component<any>> = {
	to: Recipient
	bcc?: Recipient
	replyTo?: string
	subject: string
	template: C
	props: ComponentProps<C>
}

/** A rendered email, ready for a transport. */
export type OutgoingEmail = {
	to: string[]
	bcc?: string[]
	replyTo?: string
	subject: string
	html: string
	text: string
	headers?: Record<string, string>
}

/** Delivers rendered email; throws when nothing was sent. */
type Transport = {
	send(email: OutgoingEmail): Promise<void>
	/** At most BATCH_SIZE emails */
	sendBatch(emails: OutgoingEmail[]): Promise<void>
}

export type Member = { email: string; displayName: string }

/** Who the named recipients are. */
type Directory = {
	superusers(): Promise<string[]>
	worshipLeaders(): Promise<string[]>
	member(userId: string): Promise<Member | null>
}

// Resend's batch API takes at most 100 emails per call
const BATCH_SIZE = 100

const resendTransport = (): Transport => {
	if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is not set')
	if (!RESEND_FROM_EMAIL) throw new Error('RESEND_FROM_EMAIL is not set')
	const resend = new Resend(RESEND_API_KEY)
	const from = `${church.name} <${RESEND_FROM_EMAIL}>`
	return {
		async send(email) {
			const { error } = await resend.emails.send({ from, ...email })
			if (error) throw new Error(error.message)
		},
		async sendBatch(emails) {
			const { error } = await resend.batch.send(
				emails.map((email) => ({ from, ...email }))
			)
			if (error) throw new Error(error.message)
		},
	}
}

// Uses the service-role client, so it works the same from a page, the cron or
// a webhook, whoever is (or isn't) signed in
const supabaseDirectory = (): Directory => {
	const db = getSupabaseAdmin()
	const listUsers = async () => {
		const { data, error } = await db.auth.admin.listUsers({ perPage: 1000 })
		if (error) throw error
		return data.users.filter((u) => !!u.email)
	}
	// Mirrors public.is_admin()
	const isSuperuser = (u: User) => u.app_metadata?.role === 'admin'

	return {
		async superusers() {
			return (await listUsers()).filter(isSuperuser).map((u) => u.email!)
		},
		async worshipLeaders() {
			const [users, { data: granted, error }] = await Promise.all([
				listUsers(),
				db.from('user_roles').select('user_id').eq('role', 'worship_leader'),
			])
			if (error) throw error
			const leaders = new Set((granted ?? []).map((r) => String(r.user_id)))
			return users
				.filter((u) => isSuperuser(u) || leaders.has(u.id))
				.map((u) => u.email!)
		},
		async member(userId) {
			const { data, error } = await db.auth.admin.getUserById(userId)
			if (error || !data.user?.email) return null
			const name = data.user.user_metadata?.display_name
			return {
				email: data.user.email,
				displayName: typeof name === 'string' ? name.trim() : '',
			}
		},
	}
}

let transport: Transport | undefined
let directory: Directory | undefined
const getTransport = () => (transport ??= resendTransport())
const getDirectory = () => (directory ??= supabaseDirectory())

const resolve = async (recipient: Recipient): Promise<string[]> => {
	if (recipient === 'superusers') return getDirectory().superusers()
	if (recipient === 'worshipLeaders') return getDirectory().worshipLeaders()
	if (typeof recipient === 'object') return [INBOXES[recipient.inbox]]
	return [recipient]
}

const prepare = async <C extends Component<any>>({
	to,
	bcc,
	template,
	props,
	...rest
}: Email<C>): Promise<OutgoingEmail> => {
	const [toAddresses, bccAddresses, { html, text }] = await Promise.all([
		resolve(to),
		bcc ? resolve(bcc) : undefined,
		renderEmail(template, props),
	])
	if (!toAddresses.length)
		throw new Error(`Nobody to send "${rest.subject}" to`)
	return { to: toAddresses, bcc: bccAddresses, html, text, ...rest }
}

/** Sends an email the caller depends on; throws if it didn't go out. */
export async function send<C extends Component<any>>(email: Email<C>) {
	await getTransport().send(await prepare(email))
}

/**
 * Sends a notification whose failure shouldn't fail the caller (whatever
 * triggered it is already saved). Logs and returns false instead of throwing.
 */
export async function trySend<C extends Component<any>>(email: Email<C>) {
	try {
		await send(email)
		return true
	} catch (e) {
		console.error(`[notifier] "${email.subject}"`, e)
		return false
	}
}

/** Marks a spot in `sendEach` props that each recipient fills in. */
export const blank = (name: string) => `__${name}__`

/**
 * Sends one email to many people, rendered once. Each recipient's `fill`
 * values replace the matching `blank(name)` in the content. Returns how many
 * it reached; throws only if nobody got it, so a retry can't double-send.
 */
export async function sendEach<C extends Component<any>>({
	template,
	props,
	subject,
	recipients,
}: Omit<Email<C>, 'to' | 'bcc' | 'replyTo'> & {
	recipients: {
		to: string
		fill: Record<string, string>
		headers?: Record<string, string>
	}[]
}) {
	const { html, text } = await renderEmail(template, props)
	const personalise = (content: string, fill: Record<string, string>) =>
		Object.entries(fill).reduce(
			(out, [name, value]) => out.replaceAll(blank(name), value),
			content
		)
	const emails = recipients.map(({ to, fill, headers }) => ({
		to: [to],
		subject,
		html: personalise(html, fill),
		text: personalise(text, fill),
		headers,
	}))

	let delivered = 0
	for (let i = 0; i < emails.length; i += BATCH_SIZE) {
		const batch = emails.slice(i, i + BATCH_SIZE)
		try {
			await getTransport().sendBatch(batch)
			delivered += batch.length
		} catch (e) {
			if (delivered === 0) throw e
			console.error(`[notifier] batch of "${subject}"`, e)
		}
	}
	return delivered
}

/** A member's address and display name, or null if they have no email. */
export const findMember = (userId: string) => getDirectory().member(userId)

/**
 * Test helper: routes every email to an in-memory outbox and answers
 * recipient lookups from `people`. `fail` makes matching sends throw.
 */
export function useOutbox({
	people = {},
	fail = () => false,
}: {
	people?: {
		superusers?: string[]
		worshipLeaders?: string[]
		members?: Record<string, Member>
	}
	fail?: (email: OutgoingEmail) => boolean
} = {}) {
	const sent: OutgoingEmail[] = []
	const deliver = (email: OutgoingEmail) => {
		if (fail(email)) throw new Error('outbox: send failed')
		sent.push(email)
	}
	transport = {
		async send(email) {
			deliver(email)
		},
		async sendBatch(emails) {
			if (emails.some(fail)) throw new Error('outbox: batch failed')
			emails.forEach(deliver)
		},
	}
	directory = {
		superusers: async () => people.superusers ?? [],
		worshipLeaders: async () => people.worshipLeaders ?? [],
		member: async (id) => people.members?.[id] ?? null,
	}
	return { sent, inboxes: INBOXES }
}
