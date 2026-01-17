<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { setActivePath, setNavActiveState } from '$lib/utils'
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

	onMount(() => {
		setActivePath(url)
		setNavActiveState(path)
	})
</script>

<svelte:head>
	<title>{headData.home.title}</title>
	<meta name="description" content={headData.home.description} />
	{@html `
	<link rel="canonical" href="${url}"/>
	<script type="application/ld+json">
		{
			"@context": "http://schema.org",
			"@type": "website",
			"name": "${headData.home.title}",
			"description": "${headData.home.description}",
			"url": "${url}"
		}
	</script>
	`}
</svelte:head>

<div>
	<Hero />
	<HomeWelcome links={data.links} />
	<HomeSermons sermons={data.sermons} />

	{#if data.pages.length > 0}
		<HomeNextEvent pageInfo={data.pages} />
	{/if}
</div>
