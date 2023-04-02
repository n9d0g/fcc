<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import LandingPageCard from '$lib/components/LandingPageCard.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'About', href: '/about' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | About">
	<PageTitle text="About FCC." />
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 my-8 md:my-16">
		<LandingPageCard title="Beliefs" link="/about/beliefs" />
		<LandingPageCard title="Mission & Vision" link="/about/mission-vision" />
		<LandingPageCard title="Leadership" link="/about/leadership" />
	</div>
</FccLayout>
