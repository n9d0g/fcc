<script lang="ts">
	// import '@skeletonlabs/skeleton/themes/theme-crimson.css'
	import '../theme.postcss'
	import '@skeletonlabs/skeleton/styles/all.css'
	import '../app.postcss'
	import { AppShell, Modal, storePopup, Toast, toastStore } from '@skeletonlabs/skeleton'
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom'
	import { onMount } from 'svelte'
	import Footer from '$lib/components/Footer.svelte'
	import Header from '$lib/components/Header.svelte'
	import SideNav from '$lib/components/SideNav.svelte'
	import { activePath, projectStarted } from '$lib/stores/store.js'
	import { getBirthdays, isDevEnv } from '$lib/utils'
	import { devToastSettings, wipToastSettings, modalComponentRegistry } from '$lib/constants'

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow })

	// variables
	let projectStartedValue: boolean
	projectStarted.subscribe((value) => (projectStartedValue = value))
	let activePathValue: string
	activePath.subscribe((value) => (activePathValue = value))

	// when component is mounted
	onMount(async () => {
		if (!projectStartedValue) {
			// show dev toast on non-prod sites
			if (isDevEnv(activePathValue)) toastStore.trigger(devToastSettings)

			toastStore.trigger(wipToastSettings)
			getBirthdays()
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
