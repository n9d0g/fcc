<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { fade } from 'svelte/transition'
	import { setNavActiveState, setActivePath } from '$lib/utils'

	// props
	export let headData: any
	export let breadcrumb: any

	// variables
	let path: string
	$: path = $page.url.pathname
	let url: string = $page.url.href

	onMount(() => {
		setNavActiveState(path)
		setActivePath(url)
	})
</script>

<svelte:head>
	<title>{headData.title}</title>
	<meta name="description" content={headData.description} />
	{@html `
	<link rel="canonical" href="${url}"/>
	<script type="application/ld+json">
		{
			"@context": "http://schema.org",
			"@type": "website",
			"name": "${headData.title}",
			"description": "${headData.description}",
			"url": "${url}"
		}
	</script>
	`}
</svelte:head>

<section class="container mx-auto my-8 flex h-fit flex-col px-4 lg:my-16" transition:fade={{ duration: 150 }}>
	<!-- breadcrumb -->
	<ol class="breadcrumb flex justify-end">
		{#each breadcrumb as link, index}
			{#if index !== breadcrumb.length - 1}
				<li class="crumb capitalize"><a class="anchor" href={link.href}>{link.title}</a></li>
				<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			{/if}
		{/each}
		<li class="capitalize">{breadcrumb.slice(-1)[0].title}</li>
	</ol>

	<slot />
</section>
