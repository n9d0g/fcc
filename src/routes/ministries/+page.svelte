<script lang="ts">
	import menMinistry from '#lib/assets/community/men-ministry.jpg'
	import FccLayout from '#lib/components/FccLayout.svelte'
	import LandingPageGrid from '#lib/components/LandingPageGrid.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
</script>

<FccLayout
	{title}
	{breadcrumb}
	{headData}
	image={menMinistry}
	imageAlt="FCC men's ministry at a summer get-together"
	imagePosition="center 35%"
	intro="Find a place to serve, grow and belong."
>
	<LandingPageGrid items={data.landingPageItems} />
</FccLayout>
