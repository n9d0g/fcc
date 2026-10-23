<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import Icon from '@iconify/svelte'
	import { enhance, type SubmitFunction } from '$app/forms'
	import { toaster } from '#lib/stores/toaster.js'
	import { formatSunday } from '#lib/schemas/worship-availability.js'
	import { WORSHIP_POSITIONS } from '#lib/schemas/worship-schedule.js'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	const upcoming = $derived(data.services.filter((s) => s.service_date >= data.today))
	const recent = $derived(data.services.filter((s) => s.service_date < data.today).reverse())

	let busy = $state<string | null>(null)

	// Kept between adds, so several people can go in the same position
	let rosterPosition = $state<string>(WORSHIP_POSITIONS[0].value)
	let rosterName = $state('')
	let rosterUserId = $state('')

	const userLabel = (u: PageData['users'][number]) =>
		u.display_name ? `${u.display_name} (${u.email})` : u.email

	const submit =
		(
			key: string,
			success?: (_result: Record<string, unknown>) => string,
			// Leave the form's fields as they are rather than resetting them
			keepFields = false
		): SubmitFunction =>
		({ action, cancel }) => {
			if (action.search.includes('removeFromRoster') && !confirm('Remove from the roster?')) {
				cancel()
				return
			}
			busy = key
			return async ({ result, update }) => {
				busy = null
				await update({ reset: !keepFields })
				if (result.type === 'success' && success) {
					toaster.success({ title: success(result.data ?? {}) })
				} else if (result.type === 'failure') {
					toaster.error({ title: String(result.data?.message ?? 'Something went wrong.') })
				}
			}
		}
</script>

<FccLayout heading="Worship Schedule.">
	<div class="space-y-12">
		<section class="card space-y-4 p-5 sm:p-6">
			<p class="text-sm text-muted">
				Everything here shows on the public
				<a href="/ministries/praise/schedule" class="anchor">praise schedule</a>
				as soon as you save. Check
				<a href="/admin/availability" class="anchor">team availability</a>
				before assigning people.
			</p>
			<div class="flex flex-wrap gap-2">
				<form
					method="POST"
					action="?/addSundays"
					use:enhance={submit('sundays', (d) => `Added ${d.added ?? 0} Sundays`)}
				>
					<button class="btn btn-sm btn-outline" disabled={busy === 'sundays'}>
						<Icon icon="lucide:calendar-plus" class="size-4" />
						Add the next 8 Sundays
					</button>
				</form>
				<form
					method="POST"
					action="?/importSanity"
					use:enhance={submit(
						'import',
						(d) =>
							`Imported ${d.imported ?? 0} services and ${d.rosterImported ?? 0} roster names from Sanity`
					)}
				>
					<button class="btn btn-sm btn-outline" disabled={busy === 'import'}>
						<Icon icon="lucide:download" class="size-4" />
						Import from Sanity
					</button>
				</form>
			</div>
			<form
				method="POST"
				action="?/create"
				use:enhance={submit('create')}
				class="flex flex-wrap items-end gap-2"
			>
				<label class="label flex flex-col gap-1 text-sm">
					<span>Another date <span class="text-muted">(e.g. Good Friday)</span></span>
					<input class="input" type="date" name="serviceDate" required />
				</label>
				<button class="btn btn-primary" disabled={busy === 'create'}>Add service</button>
			</form>
		</section>

		<section aria-labelledby="upcoming-services">
			<h2 id="upcoming-services" class="h3 mb-4">Upcoming ({upcoming.length})</h2>
			{#if upcoming.length}
				<ul class="card divide-y divide-line">
					{#each upcoming as s (s.id)}
						<li>
							<a
								href="/admin/worship/{s.id}"
								class="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-4 hover:bg-surface-100"
							>
								<span class="w-40 shrink-0 font-semibold">{formatSunday(s.service_date)}</span>
								<span class="min-w-0 flex-1 text-sm text-muted">
									{s.lead ?? 'No leader yet'}{s.topic ? ` · ${s.topic}` : ''}{s.speaker
										? ` · ${s.speaker}`
										: ''}
								</span>
								<span class="flex items-center gap-2 text-xs">
									{#if !s.lead}
										<span class="rounded-full bg-warning-100 px-2 py-0.5 font-medium text-warning-800"
											>Needs a leader</span
										>
									{/if}
									<span class="text-muted">{s.songs.length} songs</span>
									{#if s.chords_url}
										<Icon icon="lucide:file-music" class="size-4 text-success-700" />
										<span class="sr-only">Chords uploaded</span>
									{/if}
									<Icon icon="lucide:chevron-right" class="size-4 text-muted" />
								</span>
							</a>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="text-muted">No upcoming services. Add some above.</p>
			{/if}
		</section>

		{#if recent.length}
			<section aria-labelledby="recent-services">
				<h2 id="recent-services" class="h3 mb-4">Last four weeks</h2>
				<ul class="card divide-y divide-line">
					{#each recent as s (s.id)}
						<li>
							<a
								href="/admin/worship/{s.id}"
								class="flex flex-wrap justify-between gap-2 px-5 py-3 text-sm hover:bg-surface-100"
							>
								<span class="font-medium">{formatSunday(s.service_date)}</span>
								<span class="text-muted">{s.lead ?? '—'}{s.topic ? ` · ${s.topic}` : ''}</span>
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		<section aria-labelledby="roster">
			<h2 id="roster" class="h3 mb-1">Team roster</h2>
			<p class="mb-4 text-sm text-muted">
				Shown under the schedule as "Praise Team Assignments", and suggested while filling in a
				service.
			</p>
			<form
				method="POST"
				action="?/addToRoster"
				use:enhance={submit(
					'roster',
					(d) => {
						rosterName = ''
						rosterUserId = ''
						return `Added ${d.rosterAdded}`
					},
					true
				)}
				class="card mb-4 flex flex-wrap items-end gap-2 p-5"
			>
				<label class="label flex flex-col gap-1 text-sm">
					<span>Position</span>
					<select class="select" name="position" required bind:value={rosterPosition}>
						{#each WORSHIP_POSITIONS as p (p.value)}
							<option value={p.value}>{p.label}</option>
						{/each}
					</select>
				</label>
				<label class="label flex min-w-48 flex-1 flex-col gap-1 text-sm">
					<span>Account <span class="text-muted">(optional)</span></span>
					<select class="select" name="userId" bind:value={rosterUserId}>
						<option value="">No account</option>
						{#each data.users as u (u.id)}
							<option value={u.id}>{userLabel(u)}</option>
						{/each}
					</select>
				</label>
				<label class="label flex min-w-48 flex-1 flex-col gap-1 text-sm">
					<span>Name</span>
					<input
						class="input"
						name="name"
						maxlength="100"
						placeholder={rosterUserId ? "Uses the account's name" : ''}
						disabled={!!rosterUserId}
						required={!rosterUserId}
						bind:value={rosterName}
					/>
				</label>
				<button class="btn btn-primary" disabled={busy === 'roster'}>Add</button>
			</form>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each WORSHIP_POSITIONS as p (p.value)}
					{@const people = data.roster.filter((r) => r.position === p.value)}
					<div class="card p-4">
						<p class="mb-2 font-semibold">{p.label}</p>
						{#if people.length}
							<ul class="space-y-1">
								{#each people as r (r.id)}
									<li class="flex items-center gap-2 text-sm">
										<span class="min-w-0 flex-1 truncate">
											{r.name}
											{#if r.user_id}
												<Icon
													icon="lucide:link"
													class="inline size-3.5 text-success-700"
													aria-label="Linked to an account"
												/>
											{/if}
										</span>
										<form
											method="POST"
											action="?/linkRoster"
											use:enhance={submit(r.id, (d) =>
												d.rosterLinked ? `Linked ${d.name}` : `Unlinked ${d.name}`
											)}
										>
											<input type="hidden" name="id" value={r.id} />
											<label>
												<span class="sr-only">Account for {r.name}</span>
												<select
													class="select w-32 py-1 text-xs"
													name="userId"
													disabled={busy === r.id}
													onchange={(e) => e.currentTarget.form?.requestSubmit()}
												>
													<!-- selected (not value) so a reset after a failed save goes back to the saved account -->
													<option value="" selected={!r.user_id}>No account</option>
													{#each data.users as u (u.id)}
														<option value={u.id} selected={u.id === r.user_id}
															>{userLabel(u)}</option
														>
													{/each}
												</select>
											</label>
										</form>
										<form
											method="POST"
											action="?/removeFromRoster"
											use:enhance={submit(r.id, () => `Removed ${r.name}`)}
										>
											<input type="hidden" name="id" value={r.id} />
											<button
												class="btn-icon text-muted hover:text-error-700"
												aria-label="Remove {r.name} from {p.label}"
												disabled={busy === r.id}
											>
												<Icon icon="lucide:x" class="size-4" />
											</button>
										</form>
									</li>
								{/each}
							</ul>
						{:else}
							<p class="text-sm text-muted">Nobody yet.</p>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	</div>
</FccLayout>
