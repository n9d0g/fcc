<script lang="ts">
	import { Button, Link, Section, Text } from '@better-svelte-email/components'
	import EmailLayout from './EmailLayout.svelte'

	let {
		name,
		date,
		previousDate,
		scripture,
		scheduleUrl,
	}: {
		name: string
		/** "Wednesday, October 28, 2026" */
		date: string
		/** Set when an existing assignment moved to a new date */
		previousDate: string
		scripture: string
		scheduleUrl: string
	} = $props()
</script>

<EmailLayout
	preview={previousDate
		? `Your prayer meeting devotional moved to ${date}.`
		: `You're leading the prayer meeting devotional on ${date}.`}
	title={previousDate ? 'Your devotional date changed' : "You're leading a devotional"}
>
	<Text class="m-0 text-base leading-6 text-slate-800">Hi {name},</Text>
	<Text class="m-0 mt-4 text-base leading-6 text-slate-800">
		{#if previousDate}
			The prayer meeting devotional you're leading has moved from {previousDate} to
			the date below.
		{:else}
			You've been scheduled to lead the devotional at our weekly prayer meeting.
			Thank you for serving!
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

	<Text class="m-0 mt-6 text-sm leading-6 text-slate-600">
		We'll send you a reminder two weeks before, one week before and on the day. If
		you can't make it, please reply to this email or let the prayer team know as
		soon as you can.
	</Text>

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

	{#snippet footer()}
		You're receiving this because you were added to the prayer meeting schedule at
		<Link href="https://fcccanada.ca" class="text-slate-500 underline">fcccanada.ca</Link>.
	{/snippet}
</EmailLayout>
