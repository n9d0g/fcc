<script lang="ts">
	// mandatory imports
	import '../app.postcss'

	// skeleton imports
	import {
		AppShell,
		Modal,
		storePopup,
		Toast,
		initializeStores,
		getDrawerStore,
	} from '@skeletonlabs/skeleton'
	import {
		computePosition,
		autoUpdate,
		flip,
		shift,
		offset,
		arrow,
	} from '@floating-ui/dom'

	// regular imports
	import Footer from '$lib/components/Footer.svelte'
	import Header from '$lib/components/Header.svelte'
	import SideNav from '$lib/components/SideNav.svelte'
	import { activePath } from '$lib/stores/store.js'
	import { modalComponentRegistry } from '$lib/constants'
	import { afterNavigate } from '$app/navigation'

	import { onNavigate } from '$app/navigation'

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})

	initializeStores()
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })

	// variables
	let activePathValue: string = ''
	activePath.subscribe((value) => (activePathValue = value))

	const drawerStore = getDrawerStore()

	// scroll to top on every navigate
	afterNavigate((nav) => {
		if (nav.type === 'link') document.getElementById('page')?.scrollTo(0, 0)
	})
</script>

<!-- singleton skeleton components -->
<SideNav {drawerStore} />
<Toast position="b" />
<Modal components={modalComponentRegistry} />

<AppShell>
	<svelte:fragment slot="header"><Header {drawerStore} /></svelte:fragment>
	<main class="bg-surface-300-600-token">
		<slot />
	</main>
	<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
</AppShell>
