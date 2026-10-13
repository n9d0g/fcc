<script lang="ts">
	import { Button, Hr, Link, Section, Text } from '@better-svelte-email/components'
	import EmailLayout from './EmailLayout.svelte'

	let {
		fullName,
		email,
		roles,
		message,
		reviewUrl,
		submittedAt,
	}: {
		fullName: string
		email: string
		roles: string[]
		message: string
		reviewUrl: string
		submittedAt: string
	} = $props()
</script>

<EmailLayout
	preview={`${fullName} would like to join the worship team`}
	title="New worship team request"
>
	<Text class="m-0 text-xs font-semibold tracking-wide text-slate-500 uppercase">
		From
	</Text>
	<Text class="m-0 mt-1 text-base font-semibold text-slate-900">{fullName}</Text>
	<Link href={`mailto:${email}`} class="text-sm text-brand-dark underline">
		{email}
	</Link>

	<Hr class="my-6 border-slate-200" />

	<Text class="m-0 text-xs font-semibold tracking-wide text-slate-500 uppercase">
		Would like to serve on
	</Text>
	<Text class="m-0 mt-2 text-base leading-6 text-slate-800">
		{roles.join(', ')}
	</Text>

	{#if message}
		<Text
			class="m-0 mt-6 text-xs font-semibold tracking-wide text-slate-500 uppercase"
		>
			Message
		</Text>
		<Text class="m-0 mt-2 text-base leading-6 text-slate-800">
			{#each message.split(/\r?\n/) as line, i}{#if i > 0}<br />{/if}{line}{/each}
		</Text>
	{/if}

	<Section class="mt-6">
		<Button
			href={reviewUrl}
			pX={20}
			pY={12}
			class="rounded-md bg-brand text-sm font-semibold text-white"
		>
			Review request
		</Button>
	</Section>

	{#snippet footer()}
		Sent from the worship team request form on
		<Link href="https://fcccanada.ca" class="text-slate-500 underline">
			fcccanada.ca
		</Link>
		· {submittedAt}
	{/snippet}
</EmailLayout>
