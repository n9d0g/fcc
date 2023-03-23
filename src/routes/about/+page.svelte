<script>
	import LandingPageCard from '$lib/LandingPageCard.svelte'
	import PageTitle from '$lib/PageTitle.svelte'
</script>

<svelte:head>
	<title>FCC | About</title>
</svelte:head>

<section class="container mx-auto my-16 flex flex-col h-screen">
	<PageTitle text="About FCC" />
	<div class="grid grid-cols-3 w-full gap-4 my-16">
		<LandingPageCard title="Beliefs" link="/about/beliefs" />
		<LandingPageCard title="Mission & Vision" link="/about/mission-vision" />
		<LandingPageCard title="Leadership" link="/about/leadership" />
	</div>
</section>
