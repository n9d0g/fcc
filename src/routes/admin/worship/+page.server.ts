import { client } from '#lib/config/index.js'
import {
	WORSHIP_POSITIONS,
	isWorshipPosition,
	splitNames,
	type WorshipPosition,
	type WorshipService,
} from '#lib/schemas/worship-schedule.js'
import {
	torontoToday,
	upcomingSundays,
} from '#lib/schemas/worship-availability.js'
import { requireRole } from '#lib/server/roles.js'
import { error, fail, redirect, type RequestEvent } from '@sveltejs/kit'
import { z } from 'zod'
import type { Actions, PageServerLoad } from './$types'

type RosterEntry = {
	id: string
	position: WorshipPosition
	name: string
	user_id: string | null
}
type SiteUser = { id: string; email: string; display_name: string | null }

const listUsers = async ({ locals }: RequestEvent) => {
	const { data, error: err } = await locals.supabase.rpc('admin_list_users')
	if (err) throw err
	return (data ?? []) as SiteUser[]
}

// The name a linked roster entry takes: the account's display name, or the
// start of its email for older accounts without one
const accountName = (user: SiteUser) =>
	(user.display_name || user.email.split('@')[0]).slice(0, 100)

export const load: PageServerLoad = async (event) => {
	await requireRole(event, 'worship_leader')

	// Upcoming services plus the last four weeks, for context
	const since = new Date(
		Date.parse(`${torontoToday()}T00:00:00Z`) - 28 * 86_400_000
	)
		.toISOString()
		.slice(0, 10)

	const [services, roster, users] = await Promise.all([
		event.locals.supabase
			.from('worship_services')
			.select('id, service_date, lead, topic, speaker, songs, chords_url')
			.gte('service_date', since)
			.order('service_date')
			.returns<
				Pick<
					WorshipService,
					| 'id'
					| 'service_date'
					| 'lead'
					| 'topic'
					| 'speaker'
					| 'songs'
					| 'chords_url'
				>[]
			>(),
		event.locals.supabase
			.from('worship_roster')
			.select('id, position, name, user_id')
			.order('created_at')
			.returns<RosterEntry[]>(),
		listUsers(event).catch((e) => {
			console.error('[admin] list users', e)
			return [] as SiteUser[]
		}),
	])

	if (services.error || roster.error) {
		console.error(
			'[admin] load worship schedule',
			services.error ?? roster.error
		)
		throw error(500, 'Could not load the worship schedule')
	}

	return {
		services: services.data,
		roster: roster.data,
		users,
		today: torontoToday(),
	}
}

export const actions = {
	// Adds one service (any date, e.g. Good Friday) and opens it for editing
	create: async (event) => {
		await requireRole(event, 'worship_leader')
		const parsed = z.iso
			.date()
			.safeParse(
				String((await event.request.formData()).get('serviceDate') ?? '')
			)
		if (!parsed.success) return fail(400, { message: 'Please pick a date.' })

		const { data, error: err } = await event.locals.supabase
			.from('worship_services')
			.insert({ service_date: parsed.data })
			.select('id')
			.single()
		if (err) {
			if (err.code === '23505') {
				return fail(409, {
					message: 'There is already a service on that date.',
				})
			}
			console.error('[admin] add worship service', err)
			return fail(500, { message: 'Could not add the service.' })
		}
		throw redirect(303, `/admin/worship/${data.id}`)
	},

	// Adds the next 8 Sundays, skipping dates already scheduled
	addSundays: async (event) => {
		await requireRole(event, 'worship_leader')
		const rows = upcomingSundays(torontoToday(), 8).map((service_date) => ({
			service_date,
		}))
		const { data, error: err } = await event.locals.supabase
			.from('worship_services')
			.upsert(rows, { onConflict: 'service_date', ignoreDuplicates: true })
			.select('id')
		if (err) {
			console.error('[admin] add worship sundays', err)
			return fail(500, { message: 'Could not add services.' })
		}
		return { added: data?.length ?? 0 }
	},

	addToRoster: async (event) => {
		await requireRole(event, 'worship_leader')
		const formData = await event.request.formData()
		const position = String(formData.get('position') ?? '')
		const userId = String(formData.get('userId') ?? '')
		let name = String(formData.get('name') ?? '').trim()

		// Picking an account names the entry after it
		if (userId) {
			const user = (await listUsers(event)).find((u) => u.id === userId)
			if (!user) return fail(400, { message: 'That account no longer exists.' })
			name = accountName(user)
		}
		if (!isWorshipPosition(position) || !name || name.length > 100) {
			return fail(400, {
				message: 'Pick a position and enter a name or account.',
			})
		}
		const { error: err } = await event.locals.supabase
			.from('worship_roster')
			.insert({ position, name, user_id: userId || null })
		if (err) {
			if (err.code === '23505') {
				return fail(409, { message: `${name} is already listed there.` })
			}
			console.error('[admin] add to roster', err)
			return fail(500, { message: 'Could not update the roster.' })
		}
		return { rosterAdded: name }
	},

	// Links a roster entry to an account (taking its name), or unlinks it
	// (keeping the name) when no account is posted
	linkRoster: async (event) => {
		await requireRole(event, 'worship_leader')
		const formData = await event.request.formData()
		const id = String(formData.get('id') ?? '')
		const userId = String(formData.get('userId') ?? '')

		let update: { user_id: string | null; name?: string } = { user_id: null }
		if (userId) {
			const user = (await listUsers(event)).find((u) => u.id === userId)
			if (!user) return fail(400, { message: 'That account no longer exists.' })
			update = { user_id: user.id, name: accountName(user) }
		}

		const { data, error: err } = await event.locals.supabase
			.from('worship_roster')
			.update(update)
			.eq('id', id)
			.select('name')
		if (err) {
			if (err.code === '23505') {
				return fail(409, {
					message: `${update.name} is already listed in that position.`,
				})
			}
			console.error('[admin] link roster', err)
			return fail(500, { message: 'Could not update the roster.' })
		}
		if (!data?.length) {
			return fail(404, { message: 'That roster entry no longer exists.' })
		}
		return { rosterLinked: Boolean(userId), name: data[0].name as string }
	},

	removeFromRoster: async (event) => {
		await requireRole(event, 'worship_leader')
		const id = String((await event.request.formData()).get('id') ?? '')
		const { error: err } = await event.locals.supabase
			.from('worship_roster')
			.delete()
			.eq('id', id)
		if (err) {
			console.error('[admin] remove from roster', err)
			return fail(500, { message: 'Could not update the roster.' })
		}
		return { rosterRemoved: true as const }
	},

	// One-time move off the Sanity "praise" and "praise-assignments"
	// documents. Dates and roster names already here are left as they are.
	// Chords PDFs stay on Sanity's CDN.
	importSanity: async (event) => {
		await requireRole(event, 'worship_leader')
		const [docs, assignments] = await Promise.all([
			client.fetch<Record<string, unknown>[]>(`
				*[_type == "praise" && defined(date) && !(_id in path("drafts.**"))] {
					date, lead, guitar, backup_guitar, keys, bass, drums, electric, backup,
					series, topic, speaker, scripture, objective, summary,
					songs[]{ title, artist }, unavailableList[]{ name, reason },
					'pdfURL': pdf.asset->url
				}
			`),
			client.fetch<{ role?: string; names?: string[] }[]>(
				`*[_type == "praise-assignments"]{ role, names }`
			),
		])

		const str = (v: unknown, max = 200) =>
			typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null
		const pairs = (v: unknown, a: string, b: string) =>
			(Array.isArray(v) ? v : [])
				.map((x) => ({ [a]: str(x?.[a]) ?? '', [b]: str(x?.[b]) ?? '' }))
				.filter((x) => x[a] || x[b])

		const services = docs.map((d) => ({
			service_date: String(d.date),
			lead: str(d.lead),
			guitar: str(d.guitar),
			backup_guitar: str(d.backup_guitar),
			keys: str(d.keys),
			bass: str(d.bass),
			drums: str(d.drums),
			electric: str(d.electric),
			backup: splitNames(str(d.backup) ?? '').slice(0, 10),
			series: str(d.series),
			topic: str(d.topic),
			speaker: str(d.speaker),
			scripture: str(d.scripture),
			objective: str(d.objective, 2000),
			summary: str(d.summary, 2000),
			songs: pairs(d.songs, 'title', 'artist'),
			unavailable: pairs(d.unavailableList, 'name', 'reason'),
			chords_url: str(d.pdfURL, 2000),
		}))

		// Sanity role names ("Leaders", "Electric", ...) to roster positions
		const positionFor = (role = '') =>
			WORSHIP_POSITIONS.find(
				(p) =>
					p.label.toLowerCase() === role.trim().toLowerCase() ||
					p.value === role.trim().toLowerCase().replace(/[-\s]/g, '_')
			)?.value
		const roster = assignments.flatMap(({ role, names }) => {
			const position = positionFor(role)
			if (!position) return []
			return (names ?? [])
				.map((n) => n?.trim().slice(0, 100))
				.filter(Boolean)
				.map((name) => ({ position, name }))
		})

		const [s, r] = await Promise.all([
			services.length
				? event.locals.supabase
						.from('worship_services')
						.upsert(services, {
							onConflict: 'service_date',
							ignoreDuplicates: true,
						})
						.select('id')
				: { data: [], error: null },
			roster.length
				? event.locals.supabase
						.from('worship_roster')
						.upsert(roster, {
							onConflict: 'position,name',
							ignoreDuplicates: true,
						})
						.select('id')
				: { data: [], error: null },
		])
		if (s.error || r.error) {
			console.error('[admin] import worship from sanity', s.error ?? r.error)
			return fail(500, { message: 'Could not import from Sanity.' })
		}
		return {
			imported: s.data?.length ?? 0,
			rosterImported: r.data?.length ?? 0,
		}
	},
} satisfies Actions
