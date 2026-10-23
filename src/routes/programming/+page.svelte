<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import LandingPageGrid from '#lib/components/LandingPageGrid.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
</script>

<FccLayout heading="Programming Ministry.">
	<LandingPageGrid items={data.landingPageItems} />
</FccLayout>
