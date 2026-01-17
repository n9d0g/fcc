<script lang="ts">
	import '../app.postcss'
	import type { Snippet } from 'svelte'

	// regular imports
	import Footer from '$lib/components/Footer.svelte'
	import Header from '$lib/components/Header.svelte'
	import SideNav from '$lib/components/SideNav.svelte'
	import Banner from '$lib/components/Banner.svelte'
	import Modal from '$lib/components/Modal.svelte'
	import { activePath } from '$lib/stores/store.js'
	import { afterNavigate, onNavigate } from '$app/navigation'

	// Svelte 5 props
	let { data, children }: { data: any; children: Snippet } = $props()

	// Reactive state
	let activePathValue = $state('')
	let sideNavOpen = $state(false)

	// Subscribe to store
	$effect(() => {
		const unsubscribe = activePath.subscribe((value) => {
			activePathValue = value
		})
		return unsubscribe
	})

	// View transitions
	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})

	// Scroll to top on navigate
	afterNavigate((nav) => {
		if (nav.type === 'link') window.scrollTo(0, 0)
	})

	// Drawer controls
	const openSideNav = () => {
		sideNavOpen = true
	}

	const closeSideNav = () => {
		sideNavOpen = false
	}

	// Banner data
	let banner: App.Banner | undefined = data.banner
</script>

<!-- Side Navigation Drawer -->
<SideNav open={sideNavOpen} onclose={closeSideNav} />

<!-- Global Modal -->
<Modal />

<!-- Banner -->
<Banner {banner} />

<!-- Main Layout -->
<div class="flex min-h-screen flex-col overflow-y-auto">
	<Header onMenuClick={openSideNav} />
	<main class="flex-1 bg-gray-50 dark:bg-surface-800">
		{@render children?.()}
	</main>
	<Footer />
</div>
