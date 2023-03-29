<script lang="ts">
	import FccLayout from '$lib/FccLayout.svelte'
	import LandingPageCard from '$lib/LandingPageCard.svelte'
	import PageTitle from '$lib/PageTitle.svelte'

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'Small Groups', href: '/small-groups' },
		{ title: 'Young Adults', href: '/small-groups/young-adults' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | Young Adults SG">
	<PageTitle text="FCC Young Adults Small Group." />
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 my-16">
		<LandingPageCard title="YA Men" link="/small-groups/young-adults/men" />
		<LandingPageCard title="YA Women" link="/small-groups/young-adults/women" />
	</div>
</FccLayout>
