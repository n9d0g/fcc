<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton'
	import Icon from '@iconify/svelte'
	import NavButton from '$lib/components/NavButton.svelte'
	import { activeNav } from '$lib/stores/store.js'
	import { navOptions, drawerSettings } from '$lib/constants'
	import {
		Avatar,
		LightSwitch,
		popup,
		type PopupSettings,
		type DrawerStore,
	} from '@skeletonlabs/skeleton'

	export let drawerStore: DrawerStore

	// variables
	let activeNavValue: string
	activeNav.subscribe((value) => (activeNavValue = value))

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'bottom',
	}

	const openSideNav = () => {
		drawerStore.open(drawerSettings)
	}
</script>

<div class="bg-surface-400-500-token">
	<AppBar
		background="bg-surface-400-500-token"
		id="top"
		gridColumns="grid-cols-3"
		slotDefault="place-self-center"
		slotTrail="place-content-end"
		class="container mx-auto"
	>
		<svelte:fragment slot="lead">
			<a
				class="anchor rounded-none transition-all"
				href="/"
				aria-label="Home Logo Button"
				data-sveltekit-preload-data="hover"
			>
				<Avatar
					src="/apple-touch-icon.png"
					class="h-10 w-auto rounded-sm lg:h-20"
				/>
			</a>
		</svelte:fragment>

		<nav
			class="z-10 hidden h-10 w-full items-center justify-center gap-5 xl:flex"
			data-sveltekit-preload-data="hover"
		>
			{#key activeNavValue}
				{#each navOptions as option}
					{#if !option.title.includes('Login') && !option.title.includes('Contact')}
						<NavButton
							text={option.title}
							link={option.href}
							nav={activeNavValue}
						/>
					{/if}
				{/each}
			{/key}
		</nav>

		<svelte:fragment slot="trail">
			<LightSwitch class="z-0" />
			<button on:click={openSideNav} class="z-0" aria-label="Mobile Nav Button">
				<Icon
					class="flex h-8 w-8 cursor-pointer xl:hidden"
					icon="cil:hamburger-menu"
				/>
			</button>
			<a
				href="/contact"
				class="variant-ghost-primary btn hidden text-white xl:block"
				data-sveltekit-preload-data="hover"
			>
				Contact
			</a>
			<a
				href="/"
				class="variant-filled-secondary btn hidden text-white xl:block"
				data-sveltekit-preload-data="hover"
				use:popup={popupHover}
			>
				Log In
			</a>
			<div class="card variant-filled-tertiary p-4" data-popup="popupHover">
				<p>🚧 Login WIP 🚧</p>
				<div class="variant-filled-tertiary arrow" />
			</div>
		</svelte:fragment>
	</AppBar>
</div>
