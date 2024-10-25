<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	export let data
	const { title, breadcrumb, headData, calendarLink } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<div class="container mx-auto">
		<div class="mb-8">
			<p class="mb-4">Calendar view of the events at FCC.</p>
			<iframe
				title="FCC Calendar"
				src={calendarLink}
				frameborder="0"
				scrolling="no"
				width="100%"
				height="900px"
				class="rounded"
			/>
		</div>

		<div>
			<h2 class="h2 mb-3 font-bold">Past Events</h2>

			<div>
				<a href="/events/2024/fall-retreat" class="anchor">2024 Fall Retreat</a>
			</div>
		</div>
	</div>
</FccLayout>
