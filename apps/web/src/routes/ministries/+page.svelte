<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import LandingPageGrid from '$lib/components/LandingPageGrid.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<LandingPageGrid items={data.landingPageItems} />
</FccLayout>
