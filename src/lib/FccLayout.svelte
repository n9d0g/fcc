<script lang="ts">
	import { onMount } from 'svelte'
	import { projectStarted } from '$lib/stores/store.js'
	import { Toast, toastStore, type ToastSettings } from '@skeletonlabs/skeleton'

	// props
	export let title: string

	// variables
	let el: any
	let projectStartedValue: boolean
	projectStarted.subscribe((value) => (projectStartedValue = value))

	const t: ToastSettings = {
		message: `Heads up! This site is still under 🚧 construction 🚧`,
		timeout: 10000,
		background: 'variant-filled-error'
	}

	// when component is mounted
	onMount(() => {
		el.scrollIntoView()

		if (!projectStartedValue) toastStore.trigger(t)
		projectStarted.set(true)
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

<Toast position="t" />
