<script lang="ts">
	import { Button, Hr, Link, Section, Text } from '@better-svelte-email/components'
	import EmailLayout from './EmailLayout.svelte'

	let {
		fullName,
		email,
		unavailable,
		available,
		reviewUrl,
		updatedAt,
	}: {
		fullName: string
		email: string
		/** Newly blocked-out Sundays, already formatted */
		unavailable: string[]
		/** Sundays they've un-blocked, already formatted */
		available: string[]
		reviewUrl: string
		updatedAt: string
	} = $props()
</script>

<EmailLayout
	preview={`${fullName} updated their Sunday availability`}
	title="Availability update"
>
	<Text class="m-0 text-xs font-semibold tracking-wide text-slate-500 uppercase">
		Team member
	</Text>
	<Text class="m-0 mt-1 text-base font-semibold text-slate-900">{fullName}</Text>
	<Link href={`mailto:${email}`} class="text-sm text-brand-dark underline">
		{email}
	</Link>

	{#if unavailable.length}
		<Hr class="my-6 border-slate-200" />
		<Text class="m-0 text-xs font-semibold tracking-wide text-slate-500 uppercase">
			Can't serve on
		</Text>
		<Text class="m-0 mt-2 text-base leading-6 text-slate-800">
			{#each unavailable as date, i}{#if i > 0}<br />{/if}{date}{/each}
		</Text>
	{/if}

	{#if available.length}
		<Hr class="my-6 border-slate-200" />
		<Text class="m-0 text-xs font-semibold tracking-wide text-slate-500 uppercase">
			Available again on
		</Text>
		<Text class="m-0 mt-2 text-base leading-6 text-slate-800">
			{#each available as date, i}{#if i > 0}<br />{/if}{date}{/each}
		</Text>
	{/if}

	<Section class="mt-6">
		<Button
			href={reviewUrl}
			pX={20}
			pY={12}
			class="rounded-md bg-brand text-sm font-semibold text-white"
		>
			View team availability
		</Button>
	</Section>

	{#snippet footer()}
		Sent from the worship team availability page on
		<Link href="https://fcccanada.ca" class="text-slate-500 underline">
			fcccanada.ca
		</Link>
		· {updatedAt}
	{/snippet}
</EmailLayout>
