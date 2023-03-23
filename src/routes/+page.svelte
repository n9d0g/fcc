<script>
	import SermonCard from '$lib/sermons/SermonCard.svelte'
</script>

<svelte:head>
	<title>Freedom in Christ Church.</title>
</svelte:head>

<!-- hero -->
<section class="h-[80vh] bg-hero bg-no-repeat bg-center bg-cover">
	<div class="container h-full mx-auto flex flex-col justify-center items-center">
		<h1 class="z-10 text-white text-3xl font-bold">Welcome to Freedom in Christ Church.</h1>
		<h3 class="text-white my-8 text-lg text-center w-[50rem]">
			A Christ-centred, Holy Spirit-led community committed to the building of strong relationships
			and planting of healthy reproducing churches.
		</h3>
		<div class="flex gap-8 my-8">
			<a href="/about" class="btn variant-filled">I'm new</a>
			<a href="/sermons" class="btn variant-filled">Sermons</a>
		</div>
	</div>
</section>

<!-- zoom link -->
<section class="container mx-auto my-16 h-2/6 flex flex-col justify-center gap-8">
	<h2 class="text-center text-2xl font-bold">Come join us!</h2>
	<p class="unstyled text-xl text-center w-[50rem] mx-auto">
		We welcome you to our worship services on Sunday mornings at 10:30am! Services will be both
		online (Zoom) and in-person. Click the button below to join via Zoom, or join us in-person at
		5225 Orbitor Drive Unit 5, Mississauga, ON.
	</p>
	<div class="flex justify-center">
		<a
			class="btn variant-filled"
			href="https://us04web.zoom.us/j/3926981154?pwd=d1BHRTB3eStxZFZIS3lyWHBieENvZz09&fbclid=IwAR1N4y1LI5zX5bPnAABrXd_8ICuFko9Hw_5HV2P4wWj7U6JmALskzjO3H_U"
			target="_blank">Zoom Link</a
		>
	</div>
</section>

<!-- sermons -->
<section class="container mx-auto my-16 h-2/6 flex flex-col justify-center gap-8">
	<h2 class="text-2xl font-bold">Recent Sermons</h2>
	<div class="grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
		<SermonCard title="title" date="date" speaker="speaker" />
		<SermonCard title="title" date="date" speaker="speaker" />
		<SermonCard title="title" date="date" speaker="speaker" />
	</div>
	<div class="flex justify-center">
		<a class="btn variant-filled" href="/sermons">View All Sermons</a>
	</div>
</section>

<style lang="postcss">
	:global(html) {
		@apply h-full overflow-hidden;
	}

	:global(body) {
		@apply h-full overflow-hidden;
	}
</style>
