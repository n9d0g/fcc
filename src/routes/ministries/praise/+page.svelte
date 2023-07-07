<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import LandingPageGrid from '$lib/components/LandingPageGrid.svelte'

	export let data

	const title = data.title
	const breadcrumb = data.breadcrumb
	const headData = data.headData
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<LandingPageGrid items={data.landingPageItems} />
</FccLayout>
