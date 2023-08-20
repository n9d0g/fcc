<script lang="ts">
	// mandatory imports
	import '../theme.postcss'
	import '@skeletonlabs/skeleton/styles/skeleton.css'
	import '../app.postcss'

	// skeleton imports
	import { AppShell, Modal, storePopup, Toast, toastStore } from '@skeletonlabs/skeleton'
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom'

	// regular imports
	import { onMount } from 'svelte'
	import Footer from '$lib/components/Footer.svelte'
	import Header from '$lib/components/Header.svelte'
	import SideNav from '$lib/components/SideNav.svelte'
	import { activePath, projectStarted } from '$lib/stores/store.js'
	import { isDevEnv } from '$lib/utils'
	import { devToastSettings, modalComponentRegistry } from '$lib/constants'
	import { afterNavigate } from '$app/navigation'
	import { fade } from 'svelte/transition'

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })

	// props
	export let data

	// variables
	let projectStartedValue: boolean = false
	projectStarted.subscribe((value) => (projectStartedValue = value))
	let activePathValue: string = ''
	activePath.subscribe((value) => (activePathValue = value))

	// scroll to top on every navigate
	afterNavigate((nav) => {
		if (nav.type === 'link') document.getElementById('page')?.scrollTo(0, 0)
	})

	// when component is mounted
	onMount(async () => {
		if (!projectStartedValue) {
			// show dev toast on non-prod sites
			if (isDevEnv(activePathValue)) await toastStore.trigger(devToastSettings)
		}

		projectStarted.set(true)
	})
</script>

<!-- singleton skeleton components -->
<SideNav />
<Toast position="b" />
<Modal components={modalComponentRegistry} />

<AppShell>
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	{#key data.url}
		<div in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
			<slot />
		</div>
	{/key}
	<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
</AppShell>
