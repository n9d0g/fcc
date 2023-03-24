<script lang="ts">
	import { onMount } from 'svelte'

	// props
	export let title: string

	// variables
	let el: any

	onMount(() => el.scrollIntoView())
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
