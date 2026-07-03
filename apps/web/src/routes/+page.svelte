<script lang="ts">
	import { page } from '$app/stores'
	import { buildSeoHeadExtras } from '$lib/utils'
	import Hero from '$lib/components/home/Hero.svelte'
	import HomeWelcome from '$lib/components/home/HomeWelcome.svelte'
	import HomeNextEvent from '$lib/components/home/HomeNextEvent.svelte'
	import HomeSermons from '$lib/components/home/HomeSermons.svelte'
	import { headData } from '$lib/config'

	// Svelte 5 props
	let { data }: { data: any } = $props()

	// Derived values from page store
	let url = $derived($page.url.href)
	let seoHeadExtras = $derived(
		buildSeoHeadExtras(url, headData.home.title, headData.home.description)
	)
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
