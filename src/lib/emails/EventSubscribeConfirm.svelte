<script lang="ts">
	import { Button, Link, Section, Text } from '@better-svelte-email/components'
	import EmailLayout from './EmailLayout.svelte'

	let { confirmUrl }: { confirmUrl: string } = $props()
</script>

<EmailLayout
	preview="Confirm your email to get notified about new FCC events."
	title="Confirm your subscription"
>
	<Text class="m-0 text-base leading-6 text-slate-800">Hi there,</Text>
	<Text class="m-0 mt-4 text-base leading-6 text-slate-800">
		Thanks for signing up to hear about upcoming events at Freedom in Christ
		Church. Press the button below to confirm your email address.
	</Text>

	<Section class="mt-6">
		<Button
			href={confirmUrl}
			pX={20}
			pY={12}
			class="rounded-md bg-brand text-sm font-semibold text-white"
		>
			Confirm subscription
		</Button>
	</Section>

	<Text class="m-0 mt-6 text-sm leading-6 text-slate-600">
		If you didn't sign up, you can ignore this email and you won't hear from us.
	</Text>

	{#snippet footer()}
		Sent from the events page on
		<Link href="https://fcccanada.ca/events" class="text-slate-500 underline">
			fcccanada.ca
		</Link>
	{/snippet}
</EmailLayout>
