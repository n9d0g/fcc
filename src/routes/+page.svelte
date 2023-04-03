<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { setActivePath, setNavActiveState } from '$lib/utils'
	import Hero from '$lib/components/home/Hero.svelte'
	import HomeWelcome from '$lib/components/home/HomeWelcome.svelte'
	import HomeNextEvent from '$lib/components/home/HomeNextEvent.svelte'
	import HomeSermons from '$lib/components/home/HomeSermons.svelte'
	import { fade } from 'svelte/transition'
	import type { PageData } from './$types'

	// props
	export let data: PageData

	// variables
	let path: string
	$: path = $page.url.pathname
	let url: string = $page.url.href

	let links: any = data.links
	let sermons: any = data.sermons

	onMount(() => {
		setActivePath(url)
		setNavActiveState(path)
	})
</script>

<svelte:head>
	<title>Freedom in Christ Church.</title>
</svelte:head>

<div transition:fade={{ duration: 150 }}>
	<Hero />
	<HomeNextEvent pageInfo={data.pages} />
	<HomeWelcome {links} />
	<HomeSermons {sermons} />
</div>

<style lang="postcss">
	:global(html) {
		@apply h-full overflow-hidden;
	}

	:global(body) {
		@apply h-full overflow-hidden;
	}
</style>
