<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-crimson.css'
	import '@skeletonlabs/skeleton/styles/all.css'
	import '../app.postcss'
	import { AppShell, Modal, storePopup, Toast, toastStore } from '@skeletonlabs/skeleton'
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom'
	import { onMount } from 'svelte'
	import Footer from '$lib/components/Footer.svelte'
	import Header from '$lib/components/Header.svelte'
	import SideNav from '$lib/components/SideNav.svelte'
	import { projectStarted } from '$lib/stores/store.js'
	import { modalComponentRegistry, toastSettings } from '$lib/utils'

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow })

	// variables
	let projectStartedValue: boolean
	projectStarted.subscribe((value) => (projectStartedValue = value))

	// when component is mounted
	onMount(() => {
		if (!projectStartedValue) toastStore.trigger(toastSettings)
		projectStarted.set(true)
	})
</script>

<!-- singleton skeleton components -->
<SideNav />
<Toast position="t" />
<Modal components={modalComponentRegistry} />

<AppShell>
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	<slot />
	<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
</AppShell>
