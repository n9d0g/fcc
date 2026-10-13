<script lang="ts">
	import { Button, Link, Section, Text } from '@better-svelte-email/components'
	import EmailLayout from './EmailLayout.svelte'

	// Not sent by the app: Supabase sends this itself. The rendered HTML is
	// committed to supabase/templates/confirm-signup.html (see the test) and
	// pasted into Authentication → Email Templates → Confirm signup. The
	// {{ ... }} values are Supabase's Go template variables, filled at send time.
	const TOKEN = '{{ .Token }}'
	const CONFIRM_URL = '{{ .RedirectTo }}?mode=confirm&email={{ .Email | urlquery }}'
	const SITE = 'https://fcccanada.ca'
</script>

<EmailLayout
	preview="Confirm your email to finish creating your Freedom in Christ Church account."
	title="Confirm your email"
>
	<Text class="m-0 text-base leading-6 text-slate-800">Hi there,</Text>
	<Text class="m-0 mt-4 text-base leading-6 text-slate-800">
		Thanks for creating an account with Freedom in Christ Church. Press the
		button below and enter this code to confirm your email:
	</Text>

	<Section class="mt-6 rounded-md bg-brand-light px-6 py-4 text-center">
		<Text class="m-0 font-mono text-3xl font-bold tracking-[0.3em] text-brand-dark">
			{TOKEN}
		</Text>
	</Section>

	<Section class="mt-6">
		<Button
			href={CONFIRM_URL}
			pX={20}
			pY={12}
			class="rounded-md bg-brand text-sm font-semibold text-white"
		>
			Confirm email
		</Button>
	</Section>

	<Text class="m-0 mt-6 text-sm leading-6 text-slate-600">
		This code expires in 1 hour. If it has expired, use "Resend confirmation
		code" on the confirm page to get a new one.
	</Text>

	<Text class="m-0 mt-6 text-base leading-6 text-slate-800">
		Blessings,<br />Freedom in Christ Church
	</Text>

	{#snippet footer()}
		You're receiving this because this address was used to sign up at
		<Link href={SITE} class="text-slate-500 underline">fcccanada.ca</Link>. If
		that wasn't you, you can ignore this email.
	{/snippet}
</EmailLayout>
