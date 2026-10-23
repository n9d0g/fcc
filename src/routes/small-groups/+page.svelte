<script lang="ts">
	import bibleStudy from '#lib/assets/community/bible-study.jpg'
	import FccLayout from '#lib/components/FccLayout.svelte'
	import LandingPageGrid from '#lib/components/LandingPageGrid.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
</script>

<FccLayout
	heading="Our Small Groups."
	image={bibleStudy}
	imageAlt="An FCC small group studying the Bible together in a home"
	imagePosition="center 40%"
	intro="Smaller circles for Bible study, prayer and friendship throughout the week, across Mississauga, Brampton and online."
>
	<LandingPageGrid items={data.landingPageItems} />
</FccLayout>
