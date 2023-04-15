<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import LandingPageCard from '$lib/components/LandingPageCard.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	export let data

	const breadcrumb = [breadcrumbs.home, breadcrumbs.ministries, breadcrumbs.praise]
</script>

<FccLayout {breadcrumb} headData={data.headData}>
	<PageTitle text="Praise & Worship Ministry." />
	<div class="my-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
		<LandingPageCard title="Schedule" link="/ministries/praise/schedule" />
	</div>
</FccLayout>
