<script>
	import FccLayout from '$lib/FccLayout.svelte'
	import LandingPageCard from '$lib/LandingPageCard.svelte'
	import PageTitle from '$lib/PageTitle.svelte'
</script>

<FccLayout title="FCC | Small Groups">
	<PageTitle text="Our Small Groups." />
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 my-16">
		<LandingPageCard title="Young Adults" link="/small-groups/young-adults" />
		<LandingPageCard title="Women Chasing God" link="/small-groups/women-chasing-god" />
		<LandingPageCard title="University Bible Study" link="/small-groups/university-bible-study" />
		<LandingPageCard title="South Mississauga" link="/small-groups/south-mississauga" />
		<LandingPageCard title="Yumul Bible Study" link="/small-groups/yumul-bible-study" />
		<LandingPageCard title="Macasaquit Bible Study" link="/small-groups/macasaquit-bible-study" />
	</div>
</FccLayout>
