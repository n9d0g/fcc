<script lang="ts">
	import churchFamily from '#lib/assets/community/church-family-2.jpg'
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
	image={churchFamily}
	imageAlt="The Freedom in Christ Church family gathered outdoors"
	imagePosition="center 40%"
	intro="Get to know the family at Freedom in Christ Church, a volunteer-led Alliance church in Mississauga."
>
	<LandingPageGrid items={data.landingPageItems} />
</FccLayout>
