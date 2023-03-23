<script lang="ts">
	import LandingPageCard from '$lib/LandingPageCard.svelte'
</script>

<svelte:head>
	<title>FCC | Ministries</title>
</svelte:head>

<section class="container mx-auto my-16 flex flex-col h-screen">
	<h1>ministries page</h1>
	<div class="grid grid-cols-3 w-full gap-4 my-16">
		<LandingPageCard title="Men" link="/ministries/men" />
		<LandingPageCard title="Women" link="/ministries/women" />
		<LandingPageCard title="Pre-teens" link="/ministries/preteens" />
		<LandingPageCard title="Youth" link="/ministries/youth" />
		<LandingPageCard title="Young Adults" link="/ministries/young-adults" />
		<LandingPageCard title="Praise" link="/ministries/praise" />
	</div>
</section>
