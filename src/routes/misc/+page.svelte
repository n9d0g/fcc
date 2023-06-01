<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import LandingPageCard from '$lib/components/LandingPageCard.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	export let data

	const breadcrumb = [breadcrumbs.home, breadcrumbs.misc]
</script>

<FccLayout {breadcrumb} headData={data.headData}>
	<PageTitle text="FCC Miscellaneous." />
	<div class="my-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:my-16 md:grid-cols-3">
		<LandingPageCard title="Birthdays" link="/misc/birthdays" />
	</div>
</FccLayout>
