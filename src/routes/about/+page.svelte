<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import LandingPageGrid from '$lib/components/LandingPageGrid.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()

	// Derived values from data (reactive when data changes)
	let title = $derived(data.title)
	let headData = $derived(data.headData)
	let breadcrumb = $derived(data.breadcrumb)
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<LandingPageGrid items={data.landingPageItems} />
</FccLayout>
