<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-crimson.css'
	import '@skeletonlabs/skeleton/styles/all.css'
	import '../app.postcss'
	import {
		AppShell,
		storePopup,
		Toast,
		toastStore,
		type ToastSettings,
	} from '@skeletonlabs/skeleton'
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom'
	import { onMount } from 'svelte'
	import Footer from '$lib/components/Footer.svelte'
	import Header from '$lib/components/Header.svelte'
	import SideNav from '$lib/components/SideNav.svelte'
	import { projectStarted } from '$lib/stores/store.js'

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow })

	// variables
	let projectStartedValue: boolean
	projectStarted.subscribe((value) => (projectStartedValue = value))

	const t: ToastSettings = {
		message: `Heads up! This site is still under 🚧 construction 🚧`,
		timeout: 3000,
		background: 'variant-filled-primary',
	}

	// when component is mounted
	onMount(() => {
		if (!projectStartedValue) toastStore.trigger(t)
		projectStarted.set(true)
	})
</script>

<AppShell>
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	<svelte:fragment slot="sidebarRight"><SideNav /></svelte:fragment>
	<slot />
	<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
</AppShell>

<Toast position="t" />
