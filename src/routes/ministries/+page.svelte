<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import LandingPageCard from '$lib/components/LandingPageCard.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	export let data

	const breadcrumb = [breadcrumbs.home, breadcrumbs.ministries]
</script>

<FccLayout {breadcrumb} headData={data.headData}>
	<PageTitle text="Ministries." />
	<div class="my-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:my-16 md:grid-cols-3">
		<LandingPageCard title="Praise & Worship" link="/ministries/praise" />
		<LandingPageCard title="Men" link="/ministries/men" />
		<LandingPageCard title="Women" link="/ministries/women" />
		<LandingPageCard title="Pre-teens" link="/ministries/preteens" />
		<LandingPageCard title="Youth" link="/ministries/youth" />
		<LandingPageCard title="Young Adults" link="/ministries/young-adults" />
	</div>
</FccLayout>
