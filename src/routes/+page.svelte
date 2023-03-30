<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { scrollToTop, setNavActiveState } from '$lib/utils'
	import Hero from '$lib/components/home/Hero.svelte'
	import type { PageData } from './$types'
	import HomeWelcome from '$lib/components/home/HomeWelcome.svelte'
	import HomeSermons from '$lib/components/home/HomeSermons.svelte'
	import { fade } from 'svelte/transition'

	// props
	export let data: PageData

	// variables
	let el: any
	let path: string
	$: path = $page.url.pathname

	onMount(() => {
		scrollToTop(el)
		setNavActiveState(path)
	})
</script>

<svelte:head>
	<title>Freedom in Christ Church.</title>
</svelte:head>

<div bind:this={el} transition:fade={{ duration: 500 }} on:outroend={() => scrollToTop(el)}>
	<Hero />
	<HomeWelcome links={data.links} />
	<HomeSermons sermons={data.sermons} />
</div>

<style lang="postcss">
	:global(html) {
		@apply h-full overflow-hidden;
	}

	:global(body) {
		@apply h-full overflow-hidden;
	}
</style>
