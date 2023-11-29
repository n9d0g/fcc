<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { setActivePath, setNavActiveState } from '$lib/utils'
	import Hero from '$lib/components/home/Hero.svelte'
	import HomeWelcome from '$lib/components/home/HomeWelcome.svelte'
	import HomeNextEvent from '$lib/components/home/HomeNextEvent.svelte'
	import HomeSermons from '$lib/components/home/HomeSermons.svelte'
	import { headData } from '$lib/constants'

	// props
	export let data

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
	<HomeWelcome {links} />
	<HomeSermons {sermons} />
	<HomeNextEvent pageInfo={data.pages} />
</div>
