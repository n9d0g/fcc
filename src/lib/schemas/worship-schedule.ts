import { z } from 'zod'

// Values match the check on public.worship_roster.position
// (supabase/migrations/20261020000000_worship_services.sql). Labels match the
// column headings PraiseAssignments.svelte expects.
export const WORSHIP_POSITIONS = [
	{ value: 'leader', label: 'Leaders' },
	{ value: 'acoustic_guitar', label: 'Acoustic Guitar' },
	{ value: 'keys', label: 'Keys' },
	{ value: 'bass', label: 'Bass' },
	{ value: 'drums', label: 'Drums' },
	{ value: 'electric_guitar', label: 'Electric' },
	{ value: 'backup', label: 'Backup' },
] as const

export type WorshipPosition = (typeof WORSHIP_POSITIONS)[number]['value']

export const isWorshipPosition = (value: string): value is WorshipPosition =>
	WORSHIP_POSITIONS.some((p) => p.value === value)

// Single-person team columns on public.worship_services, in schedule order.
// `position` is the roster list suggested while typing. Backup vocals can be
// several people, so they're a separate list (`backup`).
export const TEAM_FIELDS = [
	{ name: 'lead', label: 'Leader', position: 'leader' },
	{ name: 'guitar', label: 'Acoustic guitar', position: 'acoustic_guitar' },
	{
		name: 'backup_guitar',
		label: 'Acoustic guitar 2',
		position: 'acoustic_guitar',
	},
	{ name: 'keys', label: 'Keys', position: 'keys' },
	{ name: 'bass', label: 'Bass', position: 'bass' },
	{ name: 'drums', label: 'Drums', position: 'drums' },
	{ name: 'electric', label: 'Electric', position: 'electric_guitar' },
] as const

export const SERMON_FIELDS = [
	{ name: 'series', label: 'Series', long: false },
	{ name: 'topic', label: 'Sermon topic', long: false },
	{ name: 'speaker', label: 'Speaker', long: false },
	{ name: 'scripture', label: 'Scripture', long: false },
	{ name: 'objective', label: 'Objective', long: true },
	{ name: 'summary', label: 'Summary', long: true },
] as const

export const SERVICE_LIMITS = {
	short: 200,
	long: 2000,
	songs: 20,
	backup: 10,
} as const

export type ServiceSong = { title: string; artist: string }
export type Unavailable = { name: string; reason: string }

type TeamField = (typeof TEAM_FIELDS)[number]['name']
type SermonField = (typeof SERMON_FIELDS)[number]['name']

// Row shape of public.worship_services
export type WorshipService = {
	id: string
	service_date: string
	backup: string[]
	songs: ServiceSong[]
	unavailable: Unavailable[]
	chords_url: string | null
	chords_path: string | null
} & Record<TeamField | SermonField, string | null>

const text = (max: number) =>
	z
		.string()
		.trim()
		.max(max, { error: `Keep fields to ${max} characters or fewer.` })

const songRow = z.object({
	title: text(SERVICE_LIMITS.short),
	artist: text(SERVICE_LIMITS.short),
})
const unavailableRow = z.object({
	name: text(SERVICE_LIMITS.short),
	reason: text(SERVICE_LIMITS.short),
})

export const worshipServiceSchema = z.object({
	serviceDate: z.iso.date({ error: 'Please pick a date.' }),
	...Object.fromEntries(
		TEAM_FIELDS.map((f) => [f.name, text(SERVICE_LIMITS.short)])
	),
	...Object.fromEntries(
		SERMON_FIELDS.map((f) => [
			f.name,
			text(f.long ? SERVICE_LIMITS.long : SERVICE_LIMITS.short),
		])
	),
	backup: z.array(text(SERVICE_LIMITS.short)).max(SERVICE_LIMITS.backup, {
		error: `Up to ${SERVICE_LIMITS.backup} backup vocalists.`,
	}),
	songs: z.array(songRow).max(SERVICE_LIMITS.songs),
	unavailable: z.array(unavailableRow).max(SERVICE_LIMITS.songs),
}) as unknown as z.ZodType<
	{
		serviceDate: string
		backup: string[]
		songs: ServiceSong[]
		unavailable: Unavailable[]
	} & Record<TeamField | SermonField, string>
>

/**
 * Zips repeated form fields (e.g. songTitle/songArtist) into rows, dropping
 * rows where both are blank.
 */
export const formRows = <A extends string, B extends string>(
	formData: FormData,
	[aField, a]: [string, A],
	[bField, b]: [string, B]
) => {
	const as = formData.getAll(aField).map(String)
	const bs = formData.getAll(bField).map(String)
	return as
		.map(
			(value, i) =>
				({ [a]: value.trim(), [b]: (bs[i] ?? '').trim() }) as Record<
					A | B,
					string
				>
		)
		.filter((row) => row[a] || row[b])
}

/**
 * Splits a Sanity "backup" string ("Ana, Ben & Cy") into names.
 */
export const splitNames = (value: string) =>
	value
		.split(/\s*(?:,|;|\/|&|\band\b)\s*/i)
		.map((name) => name.trim())
		.filter(Boolean)

/**
 * Schedule row in the shape the schedule page and praise modal were built
 * around when the data came from Sanity.
 */
export const toScheduleRow = (s: WorshipService) => ({
	date: s.service_date,
	lead: s.lead,
	guitar: s.guitar,
	backup_guitar: s.backup_guitar,
	keys: s.keys,
	bass: s.bass,
	drums: s.drums,
	electric: s.electric,
	backup: s.backup.join(', '),
	series: s.series,
	topic: s.topic,
	speaker: s.speaker,
	scripture: s.scripture,
	objective: s.objective,
	summary: s.summary,
	songs: s.songs,
	unavailableList: s.unavailable,
	// Searched by the "Unavailable" filter
	unavailable: s.unavailable.map((u) => u.name).join('; '),
	pdfURL: s.chords_url,
})
