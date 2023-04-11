<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import LandingPageCard from '$lib/components/LandingPageCard.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	const breadcrumb = [breadcrumbs.home, breadcrumbs.smallgroups]
</script>

<FccLayout {breadcrumb} title="FCC | Small Groups">
	<PageTitle text="Our Small Groups." />
	<div class="my-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:my-16 md:grid-cols-3">
		<LandingPageCard title="Young Adults" link="/small-groups/young-adults" />
		<LandingPageCard title="Women Chasing God" link="/small-groups/women-chasing-god" />
		<LandingPageCard title="University Bible Study" link="/small-groups/university-bible-study" />
		<LandingPageCard title="South Mississauga" link="/small-groups/south-mississauga" />
		<LandingPageCard title="Yumul Bible Study" link="/small-groups/yumul-bible-study" />
		<LandingPageCard title="Macasaquit Bible Study" link="/small-groups/macasaquit-bible-study" />
	</div>
</FccLayout>
