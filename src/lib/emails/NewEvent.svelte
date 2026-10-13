<script lang="ts">
	import { Button, Hr, Link, Section, Text } from '@better-svelte-email/components'
	import EmailLayout from './EmailLayout.svelte'

	let {
		title,
		icon,
		day,
		time,
		location,
		description,
		detailsUrl,
		googleUrl,
		outlookUrl,
		icsUrl,
		unsubscribeUrl,
		address,
	}: {
		title: string
		icon: string
		day: string
		time: string
		location: string
		description: string
		detailsUrl: string
		googleUrl: string
		outlookUrl: string
		icsUrl: string
		unsubscribeUrl: string
		/** Church mailing address, required in the footer by CASL */
		address: string
	} = $props()
</script>

<EmailLayout preview={`${title} · ${day}`} title="New event at FCC">
	<Text class="m-0 text-2xl font-bold text-slate-900">
		{#if icon}{icon}&nbsp;{/if}{title}
	</Text>

	<Text class="m-0 mt-4 text-base leading-6 text-slate-800">
		<strong>{day}</strong><br />
		{time}<br />
		{location}
	</Text>

	{#if description}
		<Text class="m-0 mt-4 text-base leading-6 text-slate-700">
			{#each description.split(/\r?\n/) as line, i}{#if i > 0}<br />{/if}{line}{/each}
		</Text>
	{/if}

	<Hr class="my-6 border-slate-200" />

	<Text class="m-0 text-xs font-semibold tracking-wide text-slate-500 uppercase">
		Add to your calendar
	</Text>
	<Section class="mt-3">
		<Button
			href={googleUrl}
			pX={16}
			pY={10}
			class="mr-2 mb-2 rounded-md bg-brand text-sm font-semibold text-white"
		>
			Google Calendar
		</Button>
		<Button
			href={outlookUrl}
			pX={16}
			pY={10}
			class="mr-2 mb-2 rounded-md bg-brand text-sm font-semibold text-white"
		>
			Outlook
		</Button>
		<Button
			href={icsUrl}
			pX={16}
			pY={10}
			class="mb-2 rounded-md bg-brand text-sm font-semibold text-white"
		>
			Apple / other (.ics)
		</Button>
	</Section>

	<Text class="m-0 mt-4 text-sm text-slate-600">
		<Link href={detailsUrl} class="text-brand-dark underline">See all upcoming events</Link>
	</Text>

	{#snippet footer()}
		You're receiving this because you subscribed to event updates from Freedom in
		Christ Church, {address}.
		<Link href={unsubscribeUrl} class="text-slate-500 underline">Unsubscribe</Link>
	{/snippet}
</EmailLayout>
