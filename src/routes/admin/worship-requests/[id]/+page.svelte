<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import Icon from '@iconify/svelte'
	import { enhance, type SubmitFunction } from '$app/forms'
	import { toaster } from '#lib/stores/toaster.js'
	import { roleLabel } from '#lib/schemas/worship-team.js'
	import { format } from 'date-fns'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	let request = $derived(data.request)

	let busy = $state(false)

	const badge = {
		pending: 'bg-warning-100 text-warning-800',
		approved: 'bg-success-100 text-success-800',
		rejected: 'bg-surface-200 text-muted',
	} as const

	const statusText = {
		pending: 'Waiting for your decision',
		approved: 'On the worship team',
		rejected: 'Denied',
	} as const

	const submit: SubmitFunction = () => {
		busy = true
		return async ({ result, update }) => {
			busy = false
			await update()
			if (result.type === 'success') {
				const approved = result.data?.status === 'approved'
				toaster.success({
					title: approved
						? `${request.full_name} added to the worship team`
						: `${request.full_name}'s request denied`,
				})
			} else if (result.type === 'failure') {
				toaster.error({
					title: String(result.data?.message ?? 'Something went wrong.'),
				})
			}
		}
	}
</script>

<FccLayout heading="Review Request.">
	<section class="mx-auto max-w-2xl space-y-6">
		<div class="card space-y-6 p-6 sm:p-8">
			<div class="flex flex-wrap items-start justify-between gap-4">
				<div class="min-w-0">
					<h2 class="h3">{request.full_name}</h2>
					<a href="mailto:{request.email}" class="anchor text-sm">
						{request.email}
					</a>
				</div>
				<span
					class="rounded-full px-3 py-1 text-sm font-medium {badge[
						request.status
					]}"
				>
					{statusText[request.status]}
				</span>
			</div>

			<div>
				<p class="eyebrow">Would like to serve on</p>
				<p class="mt-2">{request.roles.map(roleLabel).join(', ')}</p>
			</div>

			{#if request.message}
				<div>
					<p class="eyebrow">Message</p>
					<p class="mt-2 whitespace-pre-line">{request.message}</p>
				</div>
			{/if}

			<p class="text-muted text-sm">
				Requested {format(new Date(request.created_at), 'MMM d, yyyy h:mm a')}
				{#if request.reviewed_at}
					· Reviewed {format(new Date(request.reviewed_at), 'MMM d, yyyy h:mm a')}
				{/if}
			</p>

			<div class="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
				{#if request.status !== 'approved'}
					<form
						method="POST"
						action="?/approve"
						use:enhance={submit}
						class="sm:flex-1"
					>
						<input type="hidden" name="id" value={request.id} />
						<button class="btn btn-primary btn-lg w-full" disabled={busy}>
							<Icon icon="lucide:check" class="size-5" />
							Approve
						</button>
					</form>
				{/if}
				{#if request.status !== 'rejected'}
					<form
						method="POST"
						action="?/reject"
						use:enhance={submit}
						class="sm:flex-1"
					>
						<input type="hidden" name="id" value={request.id} />
						<button class="btn btn-outline btn-lg w-full" disabled={busy}>
							<Icon icon="lucide:x" class="size-5" />
							{request.status === 'approved' ? 'Remove from team' : 'Deny'}
						</button>
					</form>
				{/if}
			</div>
		</div>

		<a href="/admin/worship-requests" class="anchor inline-flex items-center gap-1">
			<Icon icon="lucide:arrow-left" class="size-4" />
			All requests
		</a>
	</section>
</FccLayout>
