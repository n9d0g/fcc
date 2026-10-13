<script lang="ts">
	import { Link, Text } from '@better-svelte-email/components'
	import EmailLayout from './EmailLayout.svelte'

	let {
		displayName,
		email,
		registeredAt,
	}: {
		displayName: string
		email: string
		registeredAt: string
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
		They'll be able to log in once they confirm their email address.
	</Text>

	{#snippet footer()}
		Sent from the sign up form on
		<Link href="https://fcccanada.ca" class="text-slate-500 underline">
			fcccanada.ca
		</Link>
		· {registeredAt}
	{/snippet}
</EmailLayout>
