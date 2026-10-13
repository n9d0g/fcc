<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import Icon from '@iconify/svelte'
	import { enhance, type SubmitFunction } from '$app/forms'
	import { toaster } from '#lib/stores/toaster.js'
	import { PRAYER_LIMITS, formatMeetingDate, type PrayerMeeting } from '#lib/schemas/prayer.js'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)

	const upcoming = $derived(data.meetings.filter((m) => m.meeting_date >= data.today))
	const recent = $derived(data.meetings.filter((m) => m.meeting_date < data.today).reverse())

	const userLabel = (u: PageData['users'][number]) =>
		u.display_name ? `${u.display_name} (${u.email})` : u.email

	let busy = $state<string | null>(null)

	const submit =
		(key: string, success: (_result: Record<string, unknown>) => string): SubmitFunction =>
		({ action, cancel }) => {
			if (action.search.includes('delete') && !confirm('Delete this meeting?')) {
				cancel()
				return
			}
			busy = key
			return async ({ result, update }) => {
				busy = null
				await update({ reset: key === 'new' })
				if (result.type === 'success') {
					toaster.success({ title: success(result.data ?? {}) })
				} else if (result.type === 'failure') {
					toaster.error({ title: String(result.data?.message ?? 'Something went wrong.') })
				}
			}
		}
</script>

{#snippet meetingForm(m: PrayerMeeting | null)}
	{@const key = m?.id ?? 'new'}
	<form
		method="POST"
		action="?/save"
		use:enhance={submit(key, (r) => {
			const base = m ? 'Meeting saved' : 'Meeting added'
			return r.notified ? `${base} · ${r.leaderName || 'Leader'} notified by email` : base
		})}
		class="grid gap-3 sm:grid-cols-2 lg:grid-cols-[10rem_1fr_1fr_1fr_auto] lg:items-end"
	>
		{#if m}<input type="hidden" name="id" value={m.id} />{/if}
		<label class="label flex flex-col gap-1 text-sm">
			<span>Date</span>
			<input class="input" type="date" name="meetingDate" value={m?.meeting_date ?? ''} required />
		</label>
		<label class="label flex flex-col gap-1 text-sm">
			<span>Leader name <span class="text-muted">(shown publicly)</span></span>
			<input
				class="input"
				name="leaderName"
				maxlength={PRAYER_LIMITS.leaderName}
				placeholder="TBA"
				value={m?.leader_name ?? ''}
			/>
		</label>
		<label class="label flex flex-col gap-1 text-sm">
			<span>Account <span class="text-muted">(gets reminders)</span></span>
			<select class="select" name="leaderUserId" value={m?.leader_user_id ?? ''}>
				<option value="">No account yet</option>
				{#each data.users as u (u.id)}
					<option value={u.id}>{userLabel(u)}</option>
				{/each}
			</select>
		</label>
		<label class="label flex flex-col gap-1 text-sm">
			<span>Scripture</span>
			<input
				class="input"
				name="scripture"
				maxlength={PRAYER_LIMITS.scripture}
				placeholder="Optional"
				value={m?.scripture ?? ''}
			/>
		</label>
		<div class="flex gap-2 sm:col-span-2 lg:col-span-1">
			<button class="btn btn-primary" disabled={busy === key}>{m ? 'Save' : 'Add'}</button>
			{#if m}
				<button
					class="btn btn-outline"
					formaction="?/delete"
					formnovalidate
					disabled={busy === key}
					aria-label="Delete meeting on {formatMeetingDate(m.meeting_date)}"
				>
					<Icon icon="lucide:trash-2" class="size-4" />
				</button>
			{/if}
		</div>
	</form>
{/snippet}

<FccLayout {title} {breadcrumb} {headData}>
	<div class="space-y-12">
		<section class="card space-y-4 p-5 sm:p-6">
			<p class="text-muted text-sm">
				Leaders linked to an account are emailed 2 weeks before, 1 week before and on the
				day of their devotional. Leaders without an account still show on the public
				schedule; link them once they sign up.
			</p>
			<div class="flex flex-wrap gap-2">
				<form
					method="POST"
					action="?/addWeeks"
					use:enhance={submit('weeks', (d) => `Added ${d.added ?? 0} meetings`)}
				>
					<button class="btn btn-sm btn-outline" disabled={busy === 'weeks'}>
						<Icon icon="lucide:calendar-plus" class="size-4" />
						Add the next 8 Wednesdays
					</button>
				</form>
				<form
					method="POST"
					action="?/importSanity"
					use:enhance={submit('import', (d) => `Imported ${d.imported ?? 0} meetings from Sanity`)}
				>
					<button class="btn btn-sm btn-outline" disabled={busy === 'import'}>
						<Icon icon="lucide:download" class="size-4" />
						Import from Sanity
					</button>
				</form>
			</div>
		</section>

		<section aria-labelledby="add-meeting">
			<h2 id="add-meeting" class="h3 mb-4">Add a meeting</h2>
			<div class="card p-5 sm:p-6">{@render meetingForm(null)}</div>
		</section>

		<section aria-labelledby="upcoming-meetings">
			<h2 id="upcoming-meetings" class="h3 mb-4">Upcoming ({upcoming.length})</h2>
			{#if upcoming.length}
				<ul class="space-y-3">
					{#each upcoming as m (m.id)}
						<li class="card p-5">
							<p class="mb-3 flex flex-wrap items-center gap-2 font-semibold">
								{formatMeetingDate(m.meeting_date)}
								{#if !m.leader_name}
									<span class="rounded-full bg-warning-100 px-2 py-0.5 text-xs font-medium text-warning-800"
										>Needs a leader</span
									>
								{:else if m.leader_user_id}
									<span class="rounded-full bg-success-100 px-2 py-0.5 text-xs font-medium text-success-800"
										>Reminders on</span
									>
								{/if}
							</p>
							{@render meetingForm(m)}
						</li>
					{/each}
				</ul>
			{:else}
				<p class="text-muted">No upcoming meetings. Add some above.</p>
			{/if}
		</section>

		{#if recent.length}
			<section aria-labelledby="recent-meetings">
				<h2 id="recent-meetings" class="h3 mb-4">Last four weeks</h2>
				<ul class="card divide-y divide-line">
					{#each recent as m (m.id)}
						<li class="flex flex-wrap justify-between gap-2 px-5 py-3 text-sm">
							<span class="font-medium">{formatMeetingDate(m.meeting_date, 'short')}</span>
							<span class="text-muted">
								{m.leader_name ?? 'TBA'}{m.scripture ? ` · ${m.scripture}` : ''}
							</span>
						</li>
					{/each}
				</ul>
			</section>
		{/if}
	</div>
</FccLayout>
