<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import LandingPageGrid from '$lib/components/LandingPageGrid.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	export let data

	const breadcrumb = [breadcrumbs.home, breadcrumbs.ministries, breadcrumbs.ministries.praise]
</script>

<FccLayout {breadcrumb} headData={data.headData}>
	<PageTitle text="Praise & Worship Ministry." />
	<LandingPageGrid items={data.landingPageItems} />
</FccLayout>
