<script lang="ts">
	import { Button, Link, Section, Text } from '@better-svelte-email/components'
	import EmailLayout from './EmailLayout.svelte'

	let {
		name,
		kind,
		date,
		daysUntil,
		scripture,
		scheduleUrl,
	}: {
		name: string
		kind: 'two_weeks' | 'one_week' | 'day_of'
		/** "Wednesday, October 28, 2026" */
		date: string
		daysUntil: number
		scripture: string
		scheduleUrl: string
	} = $props()

	const when = $derived(
		kind === 'day_of' ? 'tonight' : daysUntil === 1 ? 'tomorrow' : `in ${daysUntil} days`
	)
</script>

<EmailLayout
	preview={`You're leading the prayer meeting devotional ${when}.`}
	title={kind === 'day_of' ? "You're leading tonight" : 'Prayer meeting reminder'}
>
	<Text class="m-0 text-base leading-6 text-slate-800">Hi {name},</Text>
	<Text class="m-0 mt-4 text-base leading-6 text-slate-800">
		{#if kind === 'day_of'}
			Just a reminder that you're leading the devotional at tonight's prayer
			meeting. Thank you for serving!
		{:else}
			You're scheduled to lead the devotional at the prayer meeting {when}. Thank
			you for serving!
		{/if}
	</Text>

	<Section class="mt-6 rounded-md bg-brand-light px-6 py-4">
		<Text class="m-0 text-base font-semibold text-slate-900">{date}</Text>
		<Text class="m-0 mt-1 text-sm text-slate-700">7 PM · Prayer meeting on Zoom</Text>
		{#if scripture}
			<Text class="m-0 mt-3 text-sm text-slate-700">
				<strong>Scripture:</strong>
				{scripture}
			</Text>
		{/if}
	</Section>

	<Section class="mt-6">
		<Button
			href={scheduleUrl}
			pX={20}
			pY={12}
			class="rounded-md bg-brand text-sm font-semibold text-white"
		>
			View the prayer schedule
		</Button>
	</Section>

	<Text class="m-0 mt-6 text-sm leading-6 text-slate-600">
		Can't make it? Please reply to this email or let the prayer team know as soon
		as you can so someone else can cover.
	</Text>

	{#snippet footer()}
		You're receiving this because you're on the prayer meeting schedule at
		<Link href="https://fcccanada.ca" class="text-slate-500 underline">fcccanada.ca</Link>.
	{/snippet}
</EmailLayout>
