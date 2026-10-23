<script lang="ts">
	import { page } from '$app/state'
	import { buildSeoHeadExtras } from '#lib/utils.js'
	import Hero from '#lib/components/home/Hero.svelte'
	import HomeWelcome from '#lib/components/home/HomeWelcome.svelte'
	import HomeSermons from '#lib/components/home/HomeSermons.svelte'
	import HomeCommunity from '#lib/components/home/HomeCommunity.svelte'
	import HomeBlog from '#lib/components/home/HomeBlog.svelte'
	import HomeMembers from '#lib/components/home/HomeMembers.svelte'
	import { headData } from '#lib/config/index.js'

	// Svelte 5 props
	let { data }: { data: any } = $props()

	// Derived values from page store
	let url = $derived(page.url.href)
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
	<HomeCommunity />

	{#if !data.user}
		<HomeMembers />
	{/if}

	<HomeSermons sermons={data.sermons} />

	{#if data.posts?.length}
		<HomeBlog posts={data.posts} />
	{/if}
</div>
