<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
	let calendarLink = $derived(data.calendarLink)
</script>

<FccLayout
	{title}
	{breadcrumb}
	{headData}
	intro="Services, gatherings and special events happening at FCC."
>
	<div class="space-y-16">
		<div class="card overflow-hidden p-2 sm:p-3">
			<iframe
				title="FCC Calendar"
				src={calendarLink}
				frameborder="0"
				scrolling="no"
				width="100%"
				height="900px"
				class="rounded-xl"
			></iframe>
		</div>

		<div>
			<p class="eyebrow">Archive</p>
			<h2 class="h2 mt-3 mb-6">Past Events</h2>
			<a
				href="/events/2024/fall-retreat"
				class="card card-hover group flex max-w-md items-center justify-between gap-4 p-5"
			>
				<span class="flex items-center gap-4">
					<span class="icon-chip">🍂</span>
					<span>
						<span class="block font-semibold">2024 Fall Retreat</span>
						<span class="block text-sm text-muted">Sessions &amp; worksheets</span>
					</span>
				</span>
				<span
					class="flex size-9 items-center justify-center rounded-full bg-primary-50 text-primary-700 transition group-hover:bg-primary-700 group-hover:text-white"
				>
					→
				</span>
			</a>
		</div>
	</div>
</FccLayout>
