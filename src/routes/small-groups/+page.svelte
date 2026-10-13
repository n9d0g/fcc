<script lang="ts">
	import bibleStudy from '#lib/assets/community/bible-study.jpg'
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
	image={bibleStudy}
	imageAlt="An FCC small group studying the Bible together in a home"
	imagePosition="center 40%"
	intro="Smaller circles for Bible study, prayer and friendship throughout the week."
>
	<LandingPageGrid items={data.landingPageItems} />
</FccLayout>
