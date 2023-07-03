<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs, missionVision } from '$lib/constants'

	export let data

	const breadcrumb = [breadcrumbs.home, breadcrumbs.about, breadcrumbs.about.missionVision]
</script>

<FccLayout {breadcrumb} headData={data.headData}>
	<PageTitle text="Our Mission & Vision." />
	<div class="grid gap-4 md:grid-cols-2">
		<div class="flex flex-col items-start justify-start gap-6">
			<h2 class="h2 font-bold">Our Mission:</h2>
			<h3 class="h3">{missionVision.mission}</h3>
		</div>
		<div class="flex flex-col items-start justify-start gap-6">
			<h2 class="h2 font-bold">Our Vision:</h2>
			<h3 class="h3">{missionVision.vision}</h3>
		</div>
	</div>
</FccLayout>
