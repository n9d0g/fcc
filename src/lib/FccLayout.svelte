<script lang="ts">
	import { onMount } from 'svelte'
	import { activeNav } from '$lib/stores/store.js'
	import { page } from '$app/stores'

	// props
	export let title: string

	// variables
	let el: any

	let path: string
	$: path = $page.url.pathname

	onMount(() => {
		el.scrollIntoView()
		document.body.scrollTop = document.documentElement.scrollTop = 0

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
>
	<slot />
</section>
