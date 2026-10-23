<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import { enhance, type SubmitFunction } from '$app/forms'
	import { toaster } from '#lib/stores/toaster.js'
	import { roleLabel } from '#lib/schemas/worship-team.js'
	import { format } from 'date-fns'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	let busyId = $state<string | null>(null)

	const pendingRequests = $derived(
		data.requests.filter((r) => r.status === 'pending')
	)
	const reviewedRequests = $derived(
		data.requests.filter((r) => r.status !== 'pending')
	)

	const badge = {
		pending: 'bg-warning-100 text-warning-800',
		approved: 'bg-success-100 text-success-800',
		rejected: 'bg-surface-200 text-muted',
	} as const

	const submit =
		(id: string, name: string): SubmitFunction =>
		() => {
			busyId = id
			return async ({ result, update }) => {
				busyId = null
				await update()
				if (result.type === 'success') {
					const approved = result.data?.status === 'approved'
					toaster.success({
						title: approved ? `${name} approved` : `${name} declined`,
					})
				} else if (result.type === 'failure') {
					toaster.error({
						title: String(result.data?.message ?? 'Something went wrong.'),
					})
				}
			}
		}
</script>

{#snippet requestCard(r: PageData['requests'][number])}
	<li class="card flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
		<div class="min-w-0 flex-1 space-y-1">
			<div class="flex flex-wrap items-center gap-2">
				<a
					href="/admin/worship-requests/{r.id}"
					class="font-semibold text-ink hover:underline">{r.full_name}</a
				>
				<span
					class="rounded-full px-2 py-0.5 text-xs font-medium capitalize {badge[
						r.status
					]}">{r.status}</span
				>
			</div>
			<a href="mailto:{r.email}" class="anchor text-sm">{r.email}</a>
			<p class="text-sm">{r.roles.map(roleLabel).join(', ')}</p>
			{#if r.message}
				<p class="text-muted text-sm whitespace-pre-line">{r.message}</p>
			{/if}
			<p class="text-muted text-xs">
				Requested {format(new Date(r.created_at), 'MMM d, yyyy')}
				{#if r.reviewed_at}
					· Reviewed {format(new Date(r.reviewed_at), 'MMM d, yyyy')}
				{/if}
			</p>
		</div>

		<div class="flex shrink-0 gap-2">
			{#if r.status !== 'approved'}
				<form method="POST" action="?/approve" use:enhance={submit(r.id, r.full_name)}>
					<input type="hidden" name="id" value={r.id} />
					<button class="btn btn-sm btn-primary" disabled={busyId === r.id}>
						Approve
					</button>
				</form>
			{/if}
			{#if r.status !== 'rejected'}
				<form method="POST" action="?/reject" use:enhance={submit(r.id, r.full_name)}>
					<input type="hidden" name="id" value={r.id} />
					<button class="btn btn-sm btn-outline" disabled={busyId === r.id}>
						{r.status === 'approved' ? 'Remove' : 'Decline'}
					</button>
				</form>
			{/if}
		</div>
	</li>
{/snippet}

<FccLayout heading="Worship Team Requests.">
	<section class="space-y-12">
		<div>
			<p class="eyebrow">Needs review</p>
			<h2 class="h2 mt-3 mb-6">Pending ({pendingRequests.length})</h2>
			{#if pendingRequests.length}
				<ul class="space-y-4">
					{#each pendingRequests as r (r.id)}
						{@render requestCard(r)}
					{/each}
				</ul>
			{:else}
				<p class="text-muted">No pending requests. 🎉</p>
			{/if}
		</div>

		{#if reviewedRequests.length}
			<div>
				<p class="eyebrow">History</p>
				<h2 class="h2 mt-3 mb-6">Reviewed</h2>
				<ul class="space-y-4">
					{#each reviewedRequests as r (r.id)}
						{@render requestCard(r)}
					{/each}
				</ul>
			</div>
		{/if}
	</section>
</FccLayout>
