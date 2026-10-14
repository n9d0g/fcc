import {
	SERMON_FIELDS,
	TEAM_FIELDS,
	formRows,
	worshipServiceSchema,
	type WorshipService,
} from '#lib/schemas/worship-schedule.js'
import { requireRole } from '#lib/server/roles.js'
import { error, fail, redirect, type RequestEvent } from '@sveltejs/kit'
import { z } from 'zod'
import type { Actions, PageServerLoad } from './$types'

const CHORDS_MAX_BYTES = 20 * 1024 * 1024

const loadService = async ({ locals, params }: RequestEvent) => {
	const { data, error: err } = await locals.supabase
		.from('worship_services')
		.select()
		.eq('id', params.id!)
		.maybeSingle<WorshipService>()
	if (err) {
		console.error('[admin] load worship service', err)
		throw error(500, 'Could not load the service')
	}
	if (!data) throw error(404, 'Not found')
	return data
}

export const load: PageServerLoad = async (event) => {
	await requireRole(event, 'worship_leader')
	const service = await loadService(event)

	const [roster, songs, blocked] = await Promise.all([
		event.locals.supabase
			.from('worship_roster')
			.select('position, name')
			.order('name')
			.returns<{ position: string; name: string }[]>(),
		event.locals.supabase
			.from('songs')
			.select('song_name, artist')
			.returns<{ song_name: string; artist: string | null }[]>(),
		// Team members who blocked out this date on /ministries/praise/availability
		event.locals.supabase
			.from('worship_unavailability')
			.select('worship_team_requests!inner(full_name)')
			.eq('sunday', service.service_date)
			.returns<{ worship_team_requests: { full_name: string } }[]>(),
	])
	for (const r of [roster, songs, blocked]) {
		if (r.error) console.error('[admin] load worship service extras', r.error)
	}

	return {
		service,
		roster: roster.data ?? [],
		songLibrary: songs.data ?? [],
		blockedOut: (blocked.data ?? [])
			.map((b) => b.worship_team_requests.full_name)
			.sort(),
	}
}

export const actions = {
	save: async (event) => {
		await requireRole(event, 'worship_leader')
		const formData = await event.request.formData()
		const field = (name: string) => String(formData.get(name) ?? '')

		const parsed = worshipServiceSchema.safeParse({
			serviceDate: field('serviceDate'),
			...Object.fromEntries(
				[...TEAM_FIELDS, ...SERMON_FIELDS].map((f) => [f.name, field(f.name)])
			),
			songs: formRows(
				formData,
				['songTitle', 'title'],
				['songArtist', 'artist']
			),
			unavailable: formRows(
				formData,
				['unavailableName', 'name'],
				['unavailableReason', 'reason']
			),
		})
		if (!parsed.success) {
			const { formErrors, fieldErrors } = z.flattenError(parsed.error)
			const message =
				[...formErrors, ...Object.values(fieldErrors).flat()][0] ??
				'Please check the form.'
			return fail(400, { message })
		}
		const { serviceDate, songs, unavailable, ...rest } = parsed.data

		const { error: err } = await event.locals.supabase
			.from('worship_services')
			.update({
				service_date: serviceDate,
				...Object.fromEntries(
					Object.entries(rest).map(([k, v]) => [k, v || null])
				),
				songs,
				unavailable,
			})
			.eq('id', event.params.id)
		if (err) {
			if (err.code === '23505') {
				return fail(409, {
					message: 'There is already a service on that date.',
				})
			}
			console.error('[admin] save worship service', err)
			return fail(500, { message: 'Could not save the service.' })
		}
		return { saved: true as const }
	},

	uploadChords: async (event) => {
		await requireRole(event, 'worship_leader')
		const service = await loadService(event)
		const file = (await event.request.formData()).get('chords')
		if (!(file instanceof File) || !file.size) {
			return fail(400, { message: 'Choose a PDF to upload.' })
		}
		if (file.type !== 'application/pdf') {
			return fail(400, { message: 'Chords need to be a PDF.' })
		}
		if (file.size > CHORDS_MAX_BYTES) {
			return fail(400, { message: 'That PDF is over 20 MB.' })
		}

		// A fresh name each time, so nobody gets a cached copy of the old file
		const path = `${service.service_date}-${crypto.randomUUID().slice(0, 8)}.pdf`
		const bucket = event.locals.supabase.storage.from('chords')
		const { error: uploadError } = await bucket.upload(path, file, {
			contentType: 'application/pdf',
		})
		if (uploadError) {
			console.error('[admin] upload chords', uploadError)
			return fail(500, { message: 'Could not upload the chords.' })
		}

		const { error: err } = await event.locals.supabase
			.from('worship_services')
			.update({
				chords_url: bucket.getPublicUrl(path).data.publicUrl,
				chords_path: path,
			})
			.eq('id', service.id)
		if (err) {
			console.error('[admin] save chords', err)
			await bucket.remove([path])
			return fail(500, { message: 'Could not save the chords.' })
		}
		if (service.chords_path) await bucket.remove([service.chords_path])

		return { chordsUploaded: true as const }
	},

	removeChords: async (event) => {
		await requireRole(event, 'worship_leader')
		const service = await loadService(event)
		const { error: err } = await event.locals.supabase
			.from('worship_services')
			.update({ chords_url: null, chords_path: null })
			.eq('id', service.id)
		if (err) {
			console.error('[admin] remove chords', err)
			return fail(500, { message: 'Could not remove the chords.' })
		}
		if (service.chords_path) {
			await event.locals.supabase.storage
				.from('chords')
				.remove([service.chords_path])
		}
		return { chordsRemoved: true as const }
	},

	delete: async (event) => {
		await requireRole(event, 'worship_leader')
		const service = await loadService(event)
		const { error: err } = await event.locals.supabase
			.from('worship_services')
			.delete()
			.eq('id', service.id)
		if (err) {
			console.error('[admin] delete worship service', err)
			return fail(500, { message: 'Could not delete the service.' })
		}
		if (service.chords_path) {
			await event.locals.supabase.storage
				.from('chords')
				.remove([service.chords_path])
		}
		throw redirect(303, '/admin/worship')
	},
} satisfies Actions
