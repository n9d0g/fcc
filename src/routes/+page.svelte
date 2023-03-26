<script lang="ts">
	import { page } from '$app/stores'
	import SermonCard from '$lib/sermons/SermonCard.svelte'
	import { activeNav } from '$lib/stores/store'
	import { onMount } from 'svelte'
	import type { PageData } from './$types'

	// props
	export let data: PageData

	// variables
	let el: any

	let path: string
	$: path = $page.url.pathname

	onMount(() => {
		el.scrollIntoView()
		document.body.scrollTop = document.documentElement.scrollTop = 0

		if (path.includes('about')) activeNav.set('about')
		else if (path.includes('sermons')) activeNav.set('sermons')
		else if (path.includes('ministries')) activeNav.set('ministries')
		else if (path.includes('small-groups')) activeNav.set('small-groups')
		else if (path.includes('give')) activeNav.set('give')
		else activeNav.set('home')
	})
</script>

<svelte:head>
	<title>Freedom in Christ Church.</title>
</svelte:head>

<!-- hero -->
<section class="h-[80vh] bg-hero bg-no-repeat bg-center bg-cover px-4" bind:this={el}>
	<div class="container h-full mx-auto flex flex-col justify-center items-center">
		<h1 class="z-10 text-white text-3xl font-bold">Welcome to Freedom in Christ Church.</h1>
		<h3 class="text-white my-8 text-lg text-center md:w-[50rem]">
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
<section class="container mx-auto my-16 md:h-2/6 flex flex-col justify-center gap-8 px-4">
	<h2 class="text-center text-2xl font-bold">Come join us!</h2>
	<p class="unstyled text-xl text-center md:w-[50rem] mx-auto">
		We welcome you to our worship services on Sunday mornings at 10:30am! Services will be both
		online (Zoom) and in-person. Click the button below to join via Zoom, or join us in-person at
		<a
			href="https://www.google.ca/maps/place/5225+Orbitor+Dr,+Mississauga,+ON+L4W+4Y8/@43.6598788,-79.6065117,17z/data=!3m1!4b1!4m6!3m5!1s0x882b38554ef96393:0x5a2b697b840d7a7d!8m2!3d43.6598749!4d-79.604323!16s%2Fg%2F11b8v4jvnm"
			target="_blank"
			class="font-bold">5225 Orbitor Drive Unit 3, Mississauga, ON.</a
		>
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
<section class="container mx-auto my-16 h-2/6 flex flex-col justify-center gap-8 px-4">
	<h2 class="text-2xl font-bold text-center">Recent Sermons</h2>
	<div class="grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
		{#each data.sermons.slice(0, 3) as sermon}
			<SermonCard
				title={sermon.title}
				date={sermon.date}
				speaker={sermon.speaker}
				scripture={sermon.scripture}
				youtube={sermon.youtube}
			/>
		{/each}
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
