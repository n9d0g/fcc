<script lang="ts">
	import womenMinistry from '#lib/assets/community/women-ministry.jpg'
	import FccLayout from '#lib/components/FccLayout.svelte'
	import LandingPageGrid from '#lib/components/LandingPageGrid.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()

	// Derived values from data (reactive when data changes)
	let title = $derived(data.title)
	let headData = $derived(data.headData)
	let breadcrumb = $derived(data.breadcrumb)
</script>

<FccLayout
	{title}
	{breadcrumb}
	{headData}
	image={womenMinistry}
	imageAlt="Women of FCC gathered around the church banner"
	imagePosition="center 40%"
	intro="Get to know the family at Freedom in Christ Church, a volunteer-led Alliance church in Mississauga."
>
	<LandingPageGrid items={data.landingPageItems} />
</FccLayout>
