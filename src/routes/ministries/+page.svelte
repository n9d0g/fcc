<script lang="ts">
	import FccLayout from '$lib/FccLayout.svelte'
	import LandingPageCard from '$lib/LandingPageCard.svelte'
	import PageTitle from '$lib/PageTitle.svelte'
</script>

<FccLayout title="FCC | Ministries">
	<PageTitle text="Ministries." />
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 my-16">
		<LandingPageCard title="Praise & Worship" link="/ministries/praise" />
		<LandingPageCard title="Men" link="/ministries/men" />
		<LandingPageCard title="Women" link="/ministries/women" />
		<LandingPageCard title="Pre-teens" link="/ministries/preteens" />
		<LandingPageCard title="Youth" link="/ministries/youth" />
		<LandingPageCard title="Young Adults" link="/ministries/young-adults" />
	</div>
</FccLayout>
