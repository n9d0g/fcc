<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import LandingPageCard from '$lib/components/LandingPageCard.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	export let data

	const breadcrumb = [breadcrumbs.home, breadcrumbs.smallgroups, breadcrumbs.smallgroups.ya]
</script>

<FccLayout {breadcrumb} headData={data.headData}>
	<PageTitle text="FCC Young Adults Small Group." />
	<div class="my-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
		<LandingPageCard title="YA Men" link="/small-groups/young-adults/men" />
		<LandingPageCard title="YA Women" link="/small-groups/young-adults/women" />
	</div>
</FccLayout>
