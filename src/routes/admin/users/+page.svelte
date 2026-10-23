<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import Icon from '@iconify/svelte'
	import { enhance, type SubmitFunction } from '$app/forms'
	import { toaster } from '#lib/stores/toaster.js'
	import { ROLES } from '#lib/schemas/roles.js'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	let query = $state('')
	let busy = $state<string | null>(null)

	const roleLabel = (value: string) => ROLES.find((r) => r.value === value)?.label ?? value

	const matches = $derived(
		data.users.filter((u) =>
			`${u.display_name ?? ''} ${u.email}`.toLowerCase().includes(query.trim().toLowerCase())
		)
	)
	// Leaders first, so the people who hold a role are easy to find
	const leaders = $derived(matches.filter((u) => u.roles.length))
	const others = $derived(matches.filter((u) => !u.roles.length))

	const submit =
		(key: string): SubmitFunction =>
		() => {
			busy = key
			return async ({ result, update }) => {
				busy = null
				await update()
				if (result.type === 'success') {
					const { role, grant } = result.data ?? {}
					toaster.success({
						title: `${roleLabel(String(role))} ${grant ? 'granted' : 'removed'}`,
					})
				} else if (result.type === 'failure') {
					toaster.error({ title: String(result.data?.message ?? 'Something went wrong.') })
				}
			}
		}
</script>

{#snippet userRow(u: PageData['users'][number])}
	<li class="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
		<div class="min-w-0">
			<p class="truncate font-medium text-ink">{u.display_name ?? u.email.split('@')[0]}</p>
			<p class="truncate text-sm text-muted">{u.email}</p>
		</div>
		<div class="flex flex-wrap gap-2">
			{#each ROLES as role (role.value)}
				{@const has = u.roles.includes(role.value)}
				{@const key = `${u.id}:${role.value}`}
				<form method="POST" action="?/setRole" use:enhance={submit(key)}>
					<input type="hidden" name="userId" value={u.id} />
					<input type="hidden" name="role" value={role.value} />
					<input type="hidden" name="grant" value={String(!has)} />
					<button
						class="btn btn-sm {has ? 'btn-primary' : 'btn-outline'}"
						aria-pressed={has}
						title={role.description}
						disabled={busy === key}
					>
						<Icon icon={has ? 'lucide:check' : 'lucide:plus'} class="size-4" />
						{role.label}
					</button>
				</form>
			{/each}
		</div>
	</li>
{/snippet}

<FccLayout heading="Users & Roles.">
	<div class="space-y-10">
		<section class="card space-y-3 p-5 sm:p-6">
			<p class="text-sm text-muted">
				Leaders get access to their part of the site on their next page load. Superusers already
				have every role.
			</p>
			<ul class="space-y-1 text-sm">
				{#each ROLES as role (role.value)}
					<li><span class="font-medium">{role.label}:</span> {role.description}</li>
				{/each}
			</ul>
		</section>

		<label class="label flex flex-col gap-1 text-sm">
			<span>Search users</span>
			<input class="input" type="search" placeholder="Name or email" bind:value={query} />
		</label>

		<section aria-labelledby="leaders">
			<h2 id="leaders" class="h3 mb-4">Leaders ({leaders.length})</h2>
			{#if leaders.length}
				<ul class="card divide-y divide-line">
					{#each leaders as u (u.id)}{@render userRow(u)}{/each}
				</ul>
			{:else}
				<p class="text-muted">No leaders yet. Give someone a role below.</p>
			{/if}
		</section>

		<section aria-labelledby="everyone-else">
			<h2 id="everyone-else" class="h3 mb-4">Everyone else ({others.length})</h2>
			{#if others.length}
				<ul class="card divide-y divide-line">
					{#each others as u (u.id)}{@render userRow(u)}{/each}
				</ul>
			{:else}
				<p class="text-muted">No matching users.</p>
			{/if}
		</section>
	</div>
</FccLayout>
