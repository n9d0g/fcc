<script lang="ts">
	import { Button, Link, Section, Text } from '@better-svelte-email/components'
	import EmailLayout from './EmailLayout.svelte'

	// Not sent by the app: Supabase sends this itself. The rendered HTML is
	// committed to supabase/templates/change-email.html (see the test) and
	// pasted into Authentication → Email Templates → Change email address. The
	// {{ ... }} values are Supabase's Go template variables, filled at send time.
	// RedirectTo is /auth/confirm on whichever site requested the change.
	const CONFIRM_URL =
		'{{ .RedirectTo }}?token_hash={{ .TokenHash }}&type=email_change'
	const SITE = 'https://fcccanada.ca'
</script>

<EmailLayout
	preview="Confirm the change to your Freedom in Christ Church account email."
	title="Confirm your new email"
>
	<Text class="m-0 text-base leading-6 text-slate-800">Hi there,</Text>
	<Text class="m-0 mt-4 text-base leading-6 text-slate-800">
		We received a request to change the email on your Freedom in Christ Church
		account from {'{{ .Email }}'} to {'{{ .NewEmail }}'}. Press the button below
		to confirm.
	</Text>

	<Section class="mt-6">
		<Button
			href={CONFIRM_URL}
			pX={20}
			pY={12}
			class="rounded-md bg-brand text-sm font-semibold text-white"
		>
			Confirm email change
		</Button>
	</Section>

	<Text class="m-0 mt-6 text-sm leading-6 text-slate-600">
		This link expires in 1 hour. If you didn't ask to change your email, you can
		ignore this message and nothing will change.
	</Text>

	<Text class="m-0 mt-6 text-base leading-6 text-slate-800">
		Blessings,<br />Freedom in Christ Church
	</Text>

	{#snippet footer()}
		You're receiving this because of an account change at
		<Link href={SITE} class="text-slate-500 underline">fcccanada.ca</Link>.
	{/snippet}
</EmailLayout>
