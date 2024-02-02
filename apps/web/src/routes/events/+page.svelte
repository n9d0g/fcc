<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import Holidays from '$lib/components/holidays/holidays.svelte'
	export let data
	const { title, breadcrumb, headData, calendarLink } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<div class="container mx-auto">
		<Holidays />
		<p class="mt-10">Calendar view of the events at FCC.</p>
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
</FccLayout>
