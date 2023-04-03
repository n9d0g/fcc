<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import LandingPageCard from '$lib/components/LandingPageCard.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	const breadcrumb = [breadcrumbs.home, breadcrumbs.ministries, breadcrumbs.praise]
</script>

<FccLayout {breadcrumb} title="FCC | Praise">
	<PageTitle text="Praise & Worship Ministry." />
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 my-16">
		<LandingPageCard title="Schedule" link="/ministries/praise/schedule" />
	</div>
</FccLayout>
