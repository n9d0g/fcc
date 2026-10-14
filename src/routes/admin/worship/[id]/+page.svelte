<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import Icon from '@iconify/svelte'
	import { enhance, type SubmitFunction } from '$app/forms'
	import { toaster } from '#lib/stores/toaster.js'
	import { formatSunday } from '#lib/schemas/worship-availability.js'
	import {
		SERMON_FIELDS,
		SERVICE_LIMITS,
		TEAM_FIELDS,
		type ServiceSong,
		type Unavailable,
	} from '#lib/schemas/worship-schedule.js'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
	const service = $derived(data.service)

	// Editable lists, reset whenever a save brings back fresh data
	let songs = $state<ServiceSong[]>([])
	let unavailable = $state<Unavailable[]>([])
	$effect.pre(() => {
		songs = data.service.songs.map((s) => ({ ...s }))
		unavailable = data.service.unavailable.map((u) => ({ ...u }))
	})

	const namesFor = (position: string | null) =>
		position
			? data.roster.filter((r) => r.position === position).map((r) => r.name)
			: [...new Set(data.roster.map((r) => r.name))]

	// Blocked out on the availability page but not yet on the public list
	const blockedNotListed = $derived(
		data.blockedOut.filter((name) => !unavailable.some((u) => u.name === name))
	)

	// Picking a known song fills in its artist
	const fillArtist = (i: number) => {
		const match = data.songLibrary.find((s) => s.song_name === songs[i].title)
		if (match?.artist && !songs[i].artist) songs[i].artist = match.artist
	}

	const move = <T,>(list: T[], i: number, by: number) => {
		const j = i + by
		if (j < 0 || j >= list.length) return
		;[list[i], list[j]] = [list[j], list[i]]
	}

	let busy = $state<string | null>(null)

	const submit =
		(key: string, success: string): SubmitFunction =>
		({ action, cancel }) => {
			if (action.search.includes('delete') && !confirm('Delete this service?')) {
				cancel()
				return
			}
			busy = key
			return async ({ result, update }) => {
				busy = null
				await update({ reset: false })
				if (result.type === 'success') {
					toaster.success({ title: success })
				} else if (result.type === 'failure') {
					toaster.error({ title: String(result.data?.message ?? 'Something went wrong.') })
				}
			}
		}
</script>

{#each TEAM_FIELDS as f (f.name)}
	<datalist id="names-{f.name}">
		{#each namesFor(f.position) as name (name)}<option value={name}></option>{/each}
	</datalist>
{/each}
<datalist id="song-library">
	{#each data.songLibrary as s (s.song_name)}<option value={s.song_name}>{s.artist ?? ''}</option
		>{/each}
</datalist>

<FccLayout {title} {breadcrumb} {headData}>
	<div class="space-y-10">
		<a href="/admin/worship" class="anchor inline-flex items-center gap-1 text-sm">
			<Icon icon="lucide:arrow-left" class="size-4" />
			All services
		</a>

		<form
			id="service"
			method="POST"
			action="?/save"
			use:enhance={submit('save', 'Service saved')}
			class="space-y-10"
		>
			<section class="card grid gap-3 p-5 sm:p-6">
				<label class="label flex max-w-xs flex-col gap-1 text-sm">
					<span>Date</span>
					<input
						class="input"
						type="date"
						name="serviceDate"
						value={service.service_date}
						required
					/>
				</label>
				{#if data.blockedOut.length}
					<p class="text-sm">
						<span class="font-medium text-warning-800">Blocked out {formatSunday(service.service_date)}:</span>
						{data.blockedOut.join(', ')}
					</p>
				{/if}
			</section>

			<section aria-labelledby="team">
				<h2 id="team" class="h3 mb-4">Team</h2>
				<div class="card grid gap-3 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
					{#each TEAM_FIELDS as f (f.name)}
						<label class="label flex flex-col gap-1 text-sm">
							<span>{f.label}</span>
							<input
								class="input"
								name={f.name}
								list="names-{f.name}"
								maxlength={SERVICE_LIMITS.short}
								value={service[f.name] ?? ''}
							/>
						</label>
					{/each}
				</div>
			</section>

			<section aria-labelledby="sermon">
				<h2 id="sermon" class="h3 mb-4">Sermon</h2>
				<div class="card grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
					{#each SERMON_FIELDS as f (f.name)}
						<label class="label flex flex-col gap-1 text-sm {f.long ? 'sm:col-span-2' : ''}">
							<span>{f.label}</span>
							{#if f.long}
								<textarea
									class="textarea"
									name={f.name}
									rows="3"
									maxlength={SERVICE_LIMITS.long}
									value={service[f.name] ?? ''}
								></textarea>
							{:else}
								<input
									class="input"
									name={f.name}
									maxlength={SERVICE_LIMITS.short}
									value={service[f.name] ?? ''}
								/>
							{/if}
						</label>
					{/each}
				</div>
			</section>

			<section aria-labelledby="songs">
				<h2 id="songs" class="h3 mb-4">Songs</h2>
				<div class="card space-y-3 p-5 sm:p-6">
					{#each songs as song, i (i)}
						<div class="flex flex-wrap items-end gap-2">
							<span class="w-6 pb-2 text-sm text-muted tabular-nums">{i + 1}.</span>
							<label class="label flex min-w-48 flex-1 flex-col gap-1 text-sm">
								<span class="sr-only">Song {i + 1} title</span>
								<input
									class="input"
									name="songTitle"
									list="song-library"
									placeholder="Title"
									maxlength={SERVICE_LIMITS.short}
									bind:value={song.title}
									onchange={() => fillArtist(i)}
								/>
							</label>
							<label class="label flex min-w-40 flex-1 flex-col gap-1 text-sm">
								<span class="sr-only">Song {i + 1} artist</span>
								<input
									class="input"
									name="songArtist"
									placeholder="Artist"
									maxlength={SERVICE_LIMITS.short}
									bind:value={song.artist}
								/>
							</label>
							<div class="flex">
								<button type="button" class="btn-icon" aria-label="Move song {i + 1} up" onclick={() => move(songs, i, -1)}>
									<Icon icon="lucide:arrow-up" class="size-4" />
								</button>
								<button type="button" class="btn-icon" aria-label="Move song {i + 1} down" onclick={() => move(songs, i, 1)}>
									<Icon icon="lucide:arrow-down" class="size-4" />
								</button>
								<button type="button" class="btn-icon hover:text-error-700" aria-label="Remove song {i + 1}" onclick={() => songs.splice(i, 1)}>
									<Icon icon="lucide:x" class="size-4" />
								</button>
							</div>
						</div>
					{/each}
					{#if songs.length < SERVICE_LIMITS.songs}
						<button
							type="button"
							class="btn btn-sm btn-outline"
							onclick={() => songs.push({ title: '', artist: '' })}
						>
							<Icon icon="lucide:plus" class="size-4" />
							Add a song
						</button>
					{/if}
				</div>
			</section>

			<section aria-labelledby="unavailable">
				<h2 id="unavailable" class="h3 mb-1">Unavailable</h2>
				<p class="mb-4 text-sm text-muted">Shown publicly on the schedule.</p>
				<div class="card space-y-3 p-5 sm:p-6">
					{#each unavailable as u, i (i)}
						<div class="flex flex-wrap items-end gap-2">
							<label class="label flex min-w-40 flex-1 flex-col gap-1 text-sm">
								<span class="sr-only">Name</span>
								<input class="input" name="unavailableName" placeholder="Name" maxlength={SERVICE_LIMITS.short} bind:value={u.name} />
							</label>
							<label class="label flex min-w-48 flex-[2] flex-col gap-1 text-sm">
								<span class="sr-only">Reason</span>
								<input class="input" name="unavailableReason" placeholder="Reason (optional)" maxlength={SERVICE_LIMITS.short} bind:value={u.reason} />
							</label>
							<button type="button" class="btn-icon hover:text-error-700" aria-label="Remove {u.name || 'row'}" onclick={() => unavailable.splice(i, 1)}>
								<Icon icon="lucide:x" class="size-4" />
							</button>
						</div>
					{/each}
					<div class="flex flex-wrap gap-2">
						<button
							type="button"
							class="btn btn-sm btn-outline"
							onclick={() => unavailable.push({ name: '', reason: '' })}
						>
							<Icon icon="lucide:plus" class="size-4" />
							Add someone
						</button>
						{#if blockedNotListed.length}
							<button
								type="button"
								class="btn btn-sm btn-outline"
								onclick={() =>
									unavailable.push(...blockedNotListed.map((name) => ({ name, reason: '' })))}
							>
								<Icon icon="lucide:calendar-x" class="size-4" />
								Add everyone who blocked this date ({blockedNotListed.length})
							</button>
						{/if}
					</div>
				</div>
			</section>
		</form>

		<section aria-labelledby="chords">
			<h2 id="chords" class="h3 mb-4">Chords</h2>
			<div class="card flex flex-wrap items-end gap-3 p-5 sm:p-6">
				{#if service.chords_url}
					<a href={service.chords_url} target="_blank" class="btn btn-sm btn-secondary">
						<Icon icon="lucide:file-music" class="size-4" />
						Current PDF
					</a>
					<form method="POST" action="?/removeChords" use:enhance={submit('chords', 'Chords removed')}>
						<button class="btn btn-sm btn-outline" disabled={busy === 'chords'}>Remove</button>
					</form>
				{/if}
				<form
					method="POST"
					action="?/uploadChords"
					enctype="multipart/form-data"
					use:enhance={submit('chords', 'Chords uploaded')}
					class="flex flex-wrap items-end gap-2"
				>
					<label class="label flex flex-col gap-1 text-sm">
						<span>{service.chords_url ? 'Replace with' : 'Upload'} a PDF (up to 20 MB)</span>
						<input class="input" type="file" name="chords" accept="application/pdf" required />
					</label>
					<button class="btn btn-sm btn-primary" disabled={busy === 'chords'}>Upload</button>
				</form>
			</div>
		</section>

		<div class="flex flex-wrap justify-between gap-2">
			<form method="POST" action="?/delete" use:enhance={submit('delete', 'Service deleted')}>
				<button class="btn btn-outline" disabled={busy === 'delete'}>
					<Icon icon="lucide:trash-2" class="size-4" />
					Delete service
				</button>
			</form>
			<button form="service" class="btn btn-primary" disabled={busy === 'save'}>Save service</button>
		</div>
	</div>
</FccLayout>
