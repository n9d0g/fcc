<script lang="ts">
	import { onMount } from 'svelte'
	import { activeNav } from '$lib/stores/store.js'
	import { page } from '$app/stores'
	import { fade } from 'svelte/transition'

	// props
	export let title: string
	export let breadcrumb: any

	// variables
	let el: any

	let path: string
	$: path = $page.url.pathname

	const scrollToTop = () => {
		el.scrollIntoView()
		document.body.scrollTop = document.documentElement.scrollTop = 0
	}

	onMount(() => {
		scrollToTop()

		if (path.includes('about')) activeNav.set('about')
		else if (path.includes('sermons')) activeNav.set('sermons')
		else if (path.includes('ministries')) activeNav.set('ministries')
		else if (path.includes('small-groups')) activeNav.set('small-groups')
		else if (path.includes('give')) activeNav.set('give')
		else activeNav.set('home')
	})
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<section
	class="container mx-auto my-8 lg:my-16 flex flex-col h-fit lg:min-h-screen px-4"
	bind:this={el}
	in:fade
	out:fade
	on:introstart={() => scrollToTop()}
	on:outroend={() => scrollToTop()}
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
