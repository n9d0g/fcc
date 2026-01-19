<script lang="ts">
	import Icon from '@iconify/svelte'
	import NavButton from '$lib/components/NavButton.svelte'
	import { navigationState } from '$lib/stores/navigation.svelte'
	import { navOptions } from '$lib/constants'
	import LightDarkToggle from '$lib/components/LightDarkToggle.svelte'

	// Svelte 5 props
	let { onMenuClick }: { onMenuClick: () => void } = $props()

	// Reactive state
	let showLoginTooltip = $state(false)
</script>

<header class="bg-gray-100 dark:bg-surface-700">
	<div
		class="container mx-auto grid grid-cols-2 items-center px-4 py-2 xl:grid-cols-12"
	>
		<!-- Lead: Logo -->
		<div class="flex items-center xl:col-span-3">
			<a
				class="transition-all"
				href="/"
				aria-label="Home Logo Button"
				data-sveltekit-preload-data="hover"
			>
				<img
					src="/apple-touch-icon.png"
					alt="FCC Logo"
					class="h-10 w-auto rounded-sm lg:h-16"
				/>
			</a>
		</div>

		<!-- Center: Navigation -->
		<nav
			class="z-10 hidden h-10 w-full items-center justify-center gap-1 xl:col-span-6 xl:flex"
			data-sveltekit-preload-data="hover"
		>
			{#each navOptions as option}
				{#if !option.title.includes('Login') && !option.title.includes('Contact')}
					<NavButton
						text={option.title}
						link={option.href}
						nav={navigationState.activeNav}
					/>
				{/if}
			{/each}
		</nav>

		<!-- Trail: Actions -->
		<div class="flex items-center justify-end gap-2 xl:col-span-3">
			<LightDarkToggle />
			<button
				onclick={onMenuClick}
				class="z-0 text-gray-700 dark:text-white"
				aria-label="Mobile Nav Button"
			>
				<Icon
					class="flex h-8 w-8 cursor-pointer xl:hidden"
					icon="cil:hamburger-menu"
				/>
			</button>
			<a
				href="/contact"
				class="btn dark:bg-surface-700 hidden bg-white xl:block"
				data-sveltekit-preload-data="hover"
			>
				Contact
			</a>
			<div class="relative">
				<button
					class="btn preset-filled-secondary-500 hidden xl:block"
					onmouseenter={() => (showLoginTooltip = true)}
					onmouseleave={() => (showLoginTooltip = false)}
				>
					Log In
				</button>
				{#if showLoginTooltip}
					<div
						class="card preset-filled-surface-500 absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 p-3 shadow-lg"
					>
						<p class="text-sm whitespace-nowrap">🚧 Login WIP 🚧</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</header>
