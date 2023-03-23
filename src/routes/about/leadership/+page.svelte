<script>
	import LeadershipCard from '$lib/about/leadership/LeadershipCard.svelte'
	import FccLayout from '$lib/FccLayout.svelte'
	import PageTitle from '$lib/PageTitle.svelte'
</script>

<svelte:head>
	<title>FCC | Leadership</title>
</svelte:head>

<FccLayout title="FCC | Leadership">
	<PageTitle text="Leadership." />
	<div class="grid grid-cols-3 w-full gap-4 my-16">
		<LeadershipCard />
		<LeadershipCard />
		<LeadershipCard />
		<LeadershipCard />
		<LeadershipCard />
		<LeadershipCard />
	</div>
</FccLayout>
