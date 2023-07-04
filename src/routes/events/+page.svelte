<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	// server fetching
	export let data

	const breadcrumb = [breadcrumbs.home, breadcrumbs.events]
</script>

<FccLayout {breadcrumb} headData={data.headData}>
	<PageTitle text="FCC Events." />
	<section class="container mx-auto">
		<p class="mb-4">Calendar view of the events at FCC.</p>
		<iframe
			title="FCC Calendar"
			src="https://calendar.google.com/calendar/embed?height=900&wkst=1&bgcolor=%230ea5e9&ctz=America%2FToronto&showTitle=1&showNav=1&showDate=1&showPrint=0&showCalendars=0&src=MDMwNDY4NmZmODhhNzNlMmJjMzRmNmMxOTI4YjU4NzAxZjE0M2Y1NjVjM2Q5M2Q2MDlhZDZkZDAyZjUwOTliM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23009688"
			frameborder="0"
			scrolling="no"
			width="100%"
			height="900px"
			class="rounded"
		/>
	</section>
</FccLayout>
