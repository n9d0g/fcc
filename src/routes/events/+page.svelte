<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import Icon from '@iconify/svelte'
	import { enhance, type SubmitFunction } from '$app/forms'
	import {
		eventLocation,
		formatEventDay,
		formatEventTime,
		googleCalendarUrl,
		outlookCalendarUrl,
		splitEvents,
		type FccEvent,
	} from '#lib/events.js'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)

	const events = $derived(splitEvents(data.events))

	// Recap pages built by hand, listed with past events
	const recaps = [
		{
			href: '/events/2026/thanksgiving',
			icon: '🦃',
			title: '2026 Thanksgiving',
			detail: 'Photos & worship',
		},
		{
			href: '/events/2024/fall-retreat',
			icon: '🍂',
			title: '2024 Fall Retreat',
			detail: 'Sessions & worksheets',
		},
	]

	const month = (iso: string) =>
		new Date(iso).toLocaleDateString('en-CA', { timeZone: 'America/Toronto', month: 'short' })
	const day = (iso: string) =>
		new Date(iso).toLocaleDateString('en-CA', { timeZone: 'America/Toronto', day: 'numeric' })

	let subscribing = $state(false)
	const subscribed = $derived(!!form && 'subscribed' in form)

	const submit: SubmitFunction = () => {
		subscribing = true
		return async ({ update }) => {
			subscribing = false
			await update({ reset: false })
		}
	}
</script>

{#snippet dateBadge(event: FccEvent)}
	<div
		class="flex size-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-primary-50 text-primary-800"
		aria-hidden="true"
	>
		<span class="text-xs font-semibold tracking-wide uppercase">{month(event.start)}</span>
		<span class="font-display text-2xl leading-none font-semibold">{day(event.start)}</span>
	</div>
{/snippet}

<FccLayout
	{title}
	{breadcrumb}
	{headData}
	intro="Services, gatherings and special events happening at FCC."
>
	<div class="space-y-20 md:space-y-24">
		<!-- Upcoming -->
		<section aria-labelledby="upcoming-events">
			<p class="eyebrow">Coming up</p>
			<h2 id="upcoming-events" class="h2 mt-3 mb-8">Upcoming events</h2>

			{#if events.upcoming.length}
				<ul class="space-y-4">
					{#each events.upcoming as event (event._id)}
						<li class="card flex flex-col gap-5 p-5 sm:flex-row sm:p-6">
							{@render dateBadge(event)}
							<div class="min-w-0 flex-1 space-y-2">
								<h3 class="h4">
									{#if event.icon}<span aria-hidden="true">{event.icon}</span>{/if}
									{event.title}
								</h3>
								<p class="text-sm font-medium">
									{formatEventDay(event.start)} · {formatEventTime(event)}
								</p>
								<p class="text-muted flex items-start gap-1.5 text-sm">
									<Icon icon="lucide:map-pin" class="mt-0.5 size-4 shrink-0" />
									{eventLocation(event)}
								</p>
								{#if event.description}
									<p class="text-muted pt-1 whitespace-pre-line">{event.description}</p>
								{/if}
								<div class="flex flex-wrap items-center gap-2 pt-2">
									<details class="relative">
										<summary class="btn btn-sm btn-outline cursor-pointer list-none">
											<Icon icon="lucide:calendar-plus" class="size-4" />
											Add to calendar
										</summary>
										<div
											class="card absolute left-0 z-10 mt-2 flex min-w-48 flex-col overflow-hidden p-1 shadow-lift"
										>
											<a
												href={googleCalendarUrl(event)}
												target="_blank"
												rel="noopener noreferrer"
												class="rounded-lg px-3 py-2 text-sm hover:bg-surface-100">Google Calendar</a
											>
											<a
												href={outlookCalendarUrl(event)}
												target="_blank"
												rel="noopener noreferrer"
												class="rounded-lg px-3 py-2 text-sm hover:bg-surface-100">Outlook</a
											>
											<a
												href="/events/calendar/{event._id}"
												class="rounded-lg px-3 py-2 text-sm hover:bg-surface-100"
												>Apple / other (.ics)</a
											>
										</div>
									</details>
									{#if event.link}
										<a href={event.link} class="btn btn-sm btn-primary">More details</a>
									{/if}
								</div>
							</div>
						</li>
					{/each}
				</ul>
			{:else}
				<div class="card flex flex-col items-center gap-4 p-10 text-center">
					<span class="icon-chip size-14">
						<Icon icon="lucide:calendar-clock" class="size-6" />
					</span>
					<p class="max-w-md text-lg">
						No special events are scheduled right now. We still meet every Sunday at
						10:30 AM, and you can sign up below to hear when something is added.
					</p>
				</div>
			{/if}
		</section>

		<!-- Subscribe -->
		<section
			class="relative isolate overflow-hidden rounded-3xl bg-primary-900 p-8 text-white md:p-12"
			aria-labelledby="event-updates"
		>
			<Icon
				icon="lucide:bell-ring"
				class="absolute -right-6 -bottom-6 -z-10 size-48 text-primary-800"
			/>
			<div class="grid items-center gap-8 lg:grid-cols-2">
				<div>
					<p class="eyebrow text-secondary-300">Stay in the loop</p>
					<h2 id="event-updates" class="h2 mt-3 text-white">Get new events by email</h2>
					<p class="mt-4 text-primary-100">
						We'll email you when a new FCC event is added, with a one-tap link to add
						it to Google, Outlook or Apple Calendar. Unsubscribe any time.
					</p>
				</div>

				{#if subscribed}
					<p class="rounded-2xl bg-white/10 p-5 text-primary-50" role="status">
						<Icon icon="lucide:mail-check" class="mr-1 inline size-5 align-text-bottom" />
						Almost done! Check your inbox and press the link in our email to confirm
						your subscription.
					</p>
				{:else}
					<form
						method="POST"
						action="?/subscribe"
						use:enhance={submit}
						class="flex flex-col gap-3"
						aria-busy={subscribing}
					>
						<!-- Honeypot for bots; hidden from people and screen readers -->
						<input
							type="text"
							name="website"
							tabindex="-1"
							autocomplete="off"
							class="absolute -left-[9999px] size-px opacity-0"
							aria-hidden="true"
						/>
						<label for="subscribe-email" class="sr-only">Email address</label>
						<div class="flex flex-col gap-3 sm:flex-row">
							<input
								id="subscribe-email"
								class="input flex-1 bg-white text-ink"
								type="email"
								name="email"
								autocomplete="email"
								placeholder="you@example.com"
								value={form && 'email' in form ? form.email : ''}
								required
							/>
							<button
								class="btn bg-white text-primary-900 hover:bg-primary-50"
								disabled={subscribing}
							>
								{subscribing ? 'Signing up…' : 'Notify me'}
							</button>
						</div>
						{#if form && 'message' in form}
							<p class="text-sm text-error-200" role="alert">{form.message}</p>
						{/if}
					</form>
				{/if}
			</div>
		</section>

		<!-- Past -->
		<section aria-labelledby="past-events">
			<p class="eyebrow">Archive</p>
			<h2 id="past-events" class="h2 mt-3 mb-8">Past events</h2>

			<div class="grid gap-4 sm:grid-cols-2">
				{#each events.past as event (event._id)}
					{@const Tag = event.link ? 'a' : 'div'}
					<svelte:element
						this={Tag}
						href={event.link || undefined}
						class="card flex items-center gap-4 p-5 {event.link ? 'card-hover group' : ''}"
					>
						{@render dateBadge(event)}
						<span class="min-w-0 flex-1">
							<span class="block font-semibold">
								{#if event.icon}<span aria-hidden="true">{event.icon}</span>{/if}
								{event.title}
							</span>
							<span class="text-muted block text-sm">{formatEventDay(event.start)}</span>
						</span>
						{#if event.link}
							<span
								class="flex size-9 items-center justify-center rounded-full bg-primary-50 text-primary-700 transition group-hover:bg-primary-700 group-hover:text-white"
								aria-hidden="true">→</span
							>
						{/if}
					</svelte:element>
				{/each}

				{#each recaps as recap (recap.href)}
					<a
						href={recap.href}
						class="card card-hover group flex items-center justify-between gap-4 p-5"
					>
						<span class="flex items-center gap-4">
							<span class="icon-chip">{recap.icon}</span>
							<span>
								<span class="block font-semibold">{recap.title}</span>
								<span class="block text-sm text-muted">{recap.detail}</span>
							</span>
						</span>
						<span
							class="flex size-9 items-center justify-center rounded-full bg-primary-50 text-primary-700 transition group-hover:bg-primary-700 group-hover:text-white"
							aria-hidden="true"
						>
							→
						</span>
					</a>
				{/each}
			</div>
		</section>
	</div>
</FccLayout>
