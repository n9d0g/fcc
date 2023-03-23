<script>
	import FccLayout from '$lib/FccLayout.svelte'
	import LandingPageCard from '$lib/LandingPageCard.svelte'
	import PageTitle from '$lib/PageTitle.svelte'
</script>

<FccLayout title="FCC | About">
	<PageTitle text="About FCC." />
	<div class="grid grid-cols-3 w-full gap-4 my-16">
		<LandingPageCard title="Beliefs" link="/about/beliefs" />
		<LandingPageCard title="Mission & Vision" link="/about/mission-vision" />
		<LandingPageCard title="Leadership" link="/about/leadership" />
	</div>
</FccLayout>
