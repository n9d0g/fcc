<script lang="ts">
	import { Button, Hr, Link, Section, Text } from '@better-svelte-email/components'
	import { links } from '#lib/config/links.js'
	import EmailLayout from './EmailLayout.svelte'

	const SITE = 'https://fcccanada.ca'

	// Deliberately doesn't echo the visitor's message: this goes to whatever
	// address was typed into the form, so it shouldn't carry arbitrary content.
	let { name }: { name: string } = $props()

	let firstName = $derived(name.trim().split(/\s+/)[0])
</script>

<EmailLayout
	preview="Thanks for reaching out. We've received your message and will be in touch soon."
	title="Thanks for reaching out"
>
	<Text class="m-0 text-base leading-6 text-slate-800">Hi {firstName},</Text>
	<Text class="m-0 mt-4 text-base leading-6 text-slate-800">
		Thank you for contacting Freedom in Christ Church. We've received your
		message, and someone from our team will get back to you soon.
	</Text>
	<Text class="m-0 mt-4 text-base leading-6 text-slate-800">
		If there's anything you'd like to add in the meantime, just reply to this
		email.
	</Text>

	<Section class="mt-6">
		<Button
			href={SITE}
			pX={20}
			pY={12}
			class="rounded-md bg-brand text-sm font-semibold text-white"
		>
			Visit our website
		</Button>
	</Section>

	<Hr class="my-6 border-slate-200" />

	<Text class="m-0 text-xs font-semibold tracking-wide text-slate-500 uppercase">
		Find us
	</Text>
	<Link href={links.googleMaps} class="text-sm leading-6 text-slate-800 underline">
		5225 Orbitor Dr, Mississauga, ON L4W 4Y8
	</Link>
	<Text class="m-0 mt-3 text-sm leading-6 text-slate-600">
		<Link href={`${SITE}/sermons`} class="text-brand-dark underline">Sermons</Link>
		&nbsp;·&nbsp;
		<Link href={`${SITE}/events`} class="text-brand-dark underline">Events</Link>
		&nbsp;·&nbsp;
		<Link href={links.socials.youtube} class="text-brand-dark underline">YouTube</Link>
		&nbsp;·&nbsp;
		<Link href={links.socials.ig} class="text-brand-dark underline">Instagram</Link>
	</Text>

	<Text class="m-0 mt-6 text-base leading-6 text-slate-800">
		Blessings,<br />Freedom in Christ Church
	</Text>

	{#snippet footer()}
		You're receiving this because this address was entered on the contact form
		at
		<Link href={`${SITE}/contact`} class="text-slate-500 underline">
			fcccanada.ca
		</Link>. If that wasn't you, you can ignore this email.
	{/snippet}
</EmailLayout>
