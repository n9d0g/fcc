<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { fade, fly } from 'svelte/transition'
	import { scrollToTop, setNavActiveState } from '$lib/utils'

	// props
	export let title: string
	export let breadcrumb: any

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
	<title>{title}</title>
</svelte:head>

<section
	bind:this={el}
	class="container mx-auto my-8 lg:my-16 flex flex-col h-fit px-4"
	in:fade={{ duration: 500 }}
	out:fade={{ duration: 500 }}
	on:introstart={() => scrollToTop(el)}
	on:outroend={() => scrollToTop(el)}
>
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
