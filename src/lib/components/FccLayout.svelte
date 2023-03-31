<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { fade } from 'svelte/transition'
	import { setNavActiveState } from '$lib/utils'

	// props
	export let title: string
	export let breadcrumb: any

	// variables
	let path: string
	$: path = $page.url.pathname

	onMount(() => setNavActiveState(path))
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<section class="container mx-auto my-8 lg:my-16 flex flex-col h-fit px-4" transition:fade={{ duration: 150 }}>
	<!-- breadcrumb -->
	<ol class="flex justify-end breadcrumb">
		{#each breadcrumb as link, index}
			{#if index !== breadcrumb.length - 1}
				<li class="crumb capitalize"><a href={link.href}>{link.title}</a></li>
				<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			{/if}
		{/each}
		<li class="capitalize">{breadcrumb.slice(-1)[0].title}</li>
	</ol>

	<slot />
</section>
