<script lang="ts">
	import { Link, Text } from '@better-svelte-email/components'
	import EmailLayout from './EmailLayout.svelte'

	let {
		displayName,
		email,
		confirmedAt,
	}: {
		displayName: string
		email: string
		confirmedAt: string
	} = $props()
</script>

<EmailLayout preview={`${displayName} created an account`} title="New account">
	<Text class="m-0 text-xs font-semibold tracking-wide text-slate-500 uppercase">
		Name
	</Text>
	<Text class="m-0 mt-1 text-base font-semibold text-slate-900">{displayName}</Text>
	<Link href={`mailto:${email}`} class="text-sm text-brand-dark underline">
		{email}
	</Link>

	<Text class="m-0 mt-6 text-sm leading-6 text-slate-600">
		They've confirmed their email address and can now log in.
	</Text>

	{#snippet footer()}
		Sent when the account was confirmed on
		<Link href="https://fcccanada.ca" class="text-slate-500 underline">
			fcccanada.ca
		</Link>
		· {confirmedAt}
	{/snippet}
</EmailLayout>
