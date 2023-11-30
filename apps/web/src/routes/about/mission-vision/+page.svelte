<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	export let data
	const { title, headData, breadcrumb, missionVision } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<div class="grid gap-4 md:grid-cols-2">
		<!-- mission -->
		<div class="flex flex-col items-start justify-start gap-6">
			<h2 class="h2 font-bold">Our Mission:</h2>
			<h3 class="h3">{missionVision.mission}</h3>
		</div>
		<!-- vision -->
		<div class="flex flex-col items-start justify-start gap-6">
			<h2 class="h2 font-bold">Our Vision:</h2>
			<h3 class="h3">{missionVision.vision}</h3>
		</div>
	</div>
</FccLayout>
