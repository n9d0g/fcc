<script lang="ts">
	import FccLayout from '$lib/FccLayout.svelte'
	import LandingPageCard from '$lib/LandingPageCard.svelte'
	import PageTitle from '$lib/PageTitle.svelte'
</script>

<FccLayout title="FCC | Praise">
	<PageTitle text="Praise & Worship Ministry." />
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 my-16">
		<LandingPageCard title="Schedule" link="/ministries/praise/schedule" />
	</div>
</FccLayout>
