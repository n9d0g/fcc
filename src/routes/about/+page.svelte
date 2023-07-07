<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import LandingPageGrid from '$lib/components/LandingPageGrid.svelte'

	export let data

	const title = data.title
	const headData = data.headData
	const breadcrumb = data.breadcrumb
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<LandingPageGrid items={data.landingPageItems} />
</FccLayout>
