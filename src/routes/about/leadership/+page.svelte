<script lang="ts">
	import LeadershipCard from '$lib/components/about/leadership/LeadershipCard.svelte'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	export let data

	const breadcrumb = [breadcrumbs.home, breadcrumbs.about, breadcrumbs.about.leadership]
</script>

<FccLayout {breadcrumb} headData={data.headData}>
	<PageTitle text="Leadership." />
	<div class="my-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
		{#each data.leaders as leader}
			<LeadershipCard img={leader.img} name={leader.name} title={leader.title} />
		{/each}
	</div>
</FccLayout>
