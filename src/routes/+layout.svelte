<script lang="ts">
	// mandatory imports
	import '../theme.postcss'
	import '@skeletonlabs/skeleton/styles/skeleton.css'
	import '../app.postcss'

	// skeleton imports
	import { AppShell, Modal, storePopup, Toast, toastStore } from '@skeletonlabs/skeleton'
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom'
	import { onMount } from 'svelte'
	import Footer from '$lib/components/Footer.svelte'
	import Header from '$lib/components/Header.svelte'
	import SideNav from '$lib/components/SideNav.svelte'
	import { activePath, projectStarted } from '$lib/stores/store.js'
	import { getBirthdays, isDevEnv } from '$lib/utils'
	import { devToastSettings, modalComponentRegistry } from '$lib/constants'
	import { afterNavigate } from '$app/navigation'

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow })

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

			await getBirthdays()
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
	<slot />
	<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
</AppShell>
