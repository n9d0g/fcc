<script lang="ts">
	import LeadershipCard from '$lib/about/leadership/LeadershipCard.svelte'
	import FccLayout from '$lib/FccLayout.svelte'
	import PageTitle from '$lib/PageTitle.svelte'
	import type { PageData } from './$types'

	export let data: PageData

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'About', href: '/about' },
		{ title: 'Leadership', href: '/about/leadership' },
	]
</script>

<svelte:head>
	<title>FCC | Leadership</title>
</svelte:head>

<FccLayout {breadcrumb} title="FCC | Leadership">
	<PageTitle text="Leadership." />
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 my-16">
		{#each data.leaders as leader}
			<LeadershipCard img={leader.img} name={leader.name} title={leader.title} />
		{/each}
	</div>
</FccLayout>
