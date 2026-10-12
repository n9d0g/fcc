<script lang="ts">
	import { Button, Hr, Link, Section, Text } from '@better-svelte-email/components'
	import EmailLayout from './EmailLayout.svelte'

	let {
		name,
		email,
		message,
		submittedAt,
	}: {
		name: string
		email: string
		message: string
		submittedAt: string
	} = $props()
</script>

<EmailLayout preview={`${name}: ${message}`} title="New contact form message">
	<Text class="m-0 text-xs font-semibold tracking-wide text-slate-500 uppercase">
		From
	</Text>
	<Text class="m-0 mt-1 text-base font-semibold text-slate-900">{name}</Text>
	<Link href={`mailto:${email}`} class="text-sm text-brand-dark underline">
		{email}
	</Link>

	<Hr class="my-6 border-slate-200" />

	<Text class="m-0 text-xs font-semibold tracking-wide text-slate-500 uppercase">
		Message
	</Text>
	<Text class="m-0 mt-2 text-base leading-6 text-slate-800">
		{#each message.split(/\r?\n/) as line, i}{#if i > 0}<br />{/if}{line}{/each}
	</Text>

	<Section class="mt-6">
		<Button
			href={`mailto:${email}?subject=${encodeURIComponent('Re: Your message to Freedom in Christ Church')}`}
			pX={20}
			pY={12}
			class="rounded-md bg-brand text-sm font-semibold text-white"
		>
			Reply to {name}
		</Button>
	</Section>

	{#snippet footer()}
		Sent from the contact form on
		<Link href="https://fcccanada.ca/contact" class="text-slate-500 underline">
			fcccanada.ca
		</Link>
		· {submittedAt}
	{/snippet}
</EmailLayout>
