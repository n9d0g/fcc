<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { setActivePath, setNavActiveState, buildSeoHeadExtras } from '$lib/utils'
	import Hero from '$lib/components/home/Hero.svelte'
	import HomeWelcome from '$lib/components/home/HomeWelcome.svelte'
	import HomeNextEvent from '$lib/components/home/HomeNextEvent.svelte'
	import HomeSermons from '$lib/components/home/HomeSermons.svelte'
	import { headData } from '$lib/constants'

	// Svelte 5 props
	let { data }: { data: any } = $props()

	// Derived values from page store
	let path = $derived($page.url.pathname)
	let url = $derived($page.url.href)
	let seoHeadExtras = $derived(
		buildSeoHeadExtras(url, headData.home.title, headData.home.description)
	)

	onMount(() => {
		setActivePath(url)
		setNavActiveState(path)
	})
</script>

<svelte:head>
	<title>{headData.home.title}</title>
	<meta name="description" content={headData.home.description} />
	{@html seoHeadExtras}
</svelte:head>

<div>
	<Hero />
	<HomeWelcome links={data.links} />
	<HomeSermons sermons={data.sermons} />

	{#if data.pages.length > 0}
		<HomeNextEvent pageInfo={data.pages} />
	{/if}
</div>
