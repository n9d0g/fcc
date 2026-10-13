<script lang="ts">
	import '../app.css'
	import type { Snippet } from 'svelte'

	// regular imports
	import Footer from '#lib/components/Footer.svelte'
	import Header from '#lib/components/Header.svelte'
	import SideNav from '#lib/components/SideNav.svelte'
	import Banner from '#lib/components/Banner.svelte'
	import Dialog from '#lib/components/Modal.svelte'
	import Toaster from '#lib/components/Toaster.svelte'
	import Confetti from '#lib/components/Confetti.svelte'
	import { toaster } from '#lib/stores/toaster.js'
	import {
		afterNavigate,
		invalidate,
		onNavigate,
		replaceState,
	} from '$app/navigation'
	import { page } from '$app/state'
	import { setNavActiveState } from '#lib/stores/navigation.svelte.js'
	import { siteSchema } from '#lib/config/index.js'
	import { jsonLd } from '#lib/utils.js'

	// Svelte 5 props
	let { data, children }: { data: any; children: Snippet } = $props()

	// Reactive state
	let sideNavOpen = $state(false)
	let celebrating = $state(false)

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

	// /login redirects to /?welcome once a new account's email is confirmed
	afterNavigate(({ to }) => {
		if (!to?.url.searchParams.has('welcome')) return

		celebrating = true
		toaster.success({
			title: 'Welcome to FCC!',
			description: 'Your account is all set up and you are now signed in.',
			duration: 6000,
		})

		const url = new URL(to.url)
		url.searchParams.delete('welcome')
		replaceState(url, page.state)
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
	let user = $derived(data.user)

	$effect(() => {
		setNavActiveState(page.url.pathname)
	})

	$effect(() => {
		const supabase = data.supabase
		if (!supabase) return

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event) => {
			if (
				event === 'SIGNED_IN' ||
				event === 'SIGNED_OUT' ||
				event === 'TOKEN_REFRESHED' ||
				event === 'USER_UPDATED'
			) {
				invalidate('supabase:auth')
			}
		})

		return () => subscription.unsubscribe()
	})
</script>

<svelte:head>
	{@html jsonLd(siteSchema)}
</svelte:head>

<!-- Side Navigation Drawer -->
<SideNav open={sideNavOpen} onclose={closeSideNav} {user} />

<!-- Global Modal -->
<Dialog />

<!-- Toasts -->
<Toaster />

{#if celebrating}
	<Confetti onend={() => (celebrating = false)} />
{/if}

<!-- Banner -->
<Banner {banner} />

<!-- Main Layout -->
<div class="flex min-h-svh flex-col">
	<Header onMenuClick={openSideNav} {user} />
	<main class="flex-1">
		{@render children?.()}
	</main>
	<Footer />
</div>
