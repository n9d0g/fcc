<script lang="ts">
	import '../app.css'
	import type { Snippet } from 'svelte'

	// regular imports
	import Footer from '$lib/components/Footer.svelte'
	import Header from '$lib/components/Header.svelte'
	import SideNav from '$lib/components/SideNav.svelte'
	import Banner from '$lib/components/Banner.svelte'
	import Dialog from '$lib/components/Modal.svelte'
	import { navigationState } from '$lib/stores/navigation.svelte'
	import { afterNavigate, onNavigate } from '$app/navigation'

	// Svelte 5 props
	let { data, children }: { data: any; children: Snippet } = $props()

	// Reactive state
	let sideNavOpen = $state(false)

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

	// Banner data (derived to stay reactive when data changes)
	let banner = $derived(data.banner as App.Banner | undefined)
</script>

<!-- Side Navigation Drawer -->
<SideNav open={sideNavOpen} onclose={closeSideNav} />

<!-- Global Modal -->
<Dialog />

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
