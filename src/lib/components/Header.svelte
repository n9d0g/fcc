<script lang="ts">
	import Icon from '@iconify/svelte'
	import NavButton from '#lib/components/NavButton.svelte'
	import { navigationState } from '#lib/stores/navigation.svelte.js'
	import { navOptions } from '#lib/config/index.js'
	import UserMenu from '#lib/components/UserMenu.svelte'
	import type { User } from '@supabase/supabase-js'

	let {
		onMenuClick,
		user = null,
	}: {
		onMenuClick: () => void
		user?: User | null
	} = $props()

	const primaryNav = navOptions.filter(
		(option) => option.title !== 'Login' && option.title !== 'Contact'
	)
</script>

<header
	class="sticky top-0 z-50 border-b border-line/80 bg-paper/85 backdrop-blur-md"
>
	<div class="wrap flex h-16 items-center justify-between gap-6 lg:h-20">
		<!-- Logo -->
		<a
			class="flex shrink-0 items-center gap-3"
			href="/"
			aria-label="Freedom in Christ Church home"
			data-sveltekit-preload-data="hover"
		>
			<img
				src="/apple-touch-icon.png"
				alt=""
				class="size-10 rounded-full bg-white ring-1 ring-line lg:size-12"
			/>
			<span class="hidden leading-tight sm:block">
				<span class="block font-display text-lg font-semibold text-ink">
					Freedom in Christ
				</span>
				<span
					class="block text-[0.65rem] font-semibold tracking-[0.2em] text-secondary-700 uppercase"
				>
					Church · Mississauga
				</span>
			</span>
		</a>

		<!-- Navigation -->
		<nav
			class="hidden items-center gap-1 xl:flex"
			aria-label="Main"
			data-sveltekit-preload-data="hover"
		>
			{#each primaryNav as option}
				<NavButton
					text={option.title}
					link={option.href}
					nav={navigationState.activeNav}
				/>
			{/each}
		</nav>

		<!-- Actions -->
		<div class="flex items-center gap-2">
			<a
				href="/contact"
				class="btn btn-ghost hidden xl:inline-flex"
				data-sveltekit-preload-data="hover"
			>
				Contact
			</a>
			{#if user}
				<UserMenu {user} />
			{:else}
				<a
					href="/login"
					class="btn btn-primary hidden xl:inline-flex"
					data-sveltekit-preload-data="hover"
				>
					Log in
				</a>
			{/if}
			<button
				onclick={onMenuClick}
				class="btn-icon text-ink hover:bg-primary-50 xl:hidden"
				aria-label="Open menu"
			>
				<Icon class="size-7" icon="lucide:menu" />
			</button>
		</div>
	</div>
</header>
