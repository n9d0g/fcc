<script lang="ts">
	import { navOptions } from '#lib/config/index.js'
	import Icon from '@iconify/svelte'
	import UserMenu from '#lib/components/UserMenu.svelte'
	import { navigationState } from '#lib/stores/navigation.svelte.js'
	import type { User } from '@supabase/supabase-js'

	let {
		open,
		onclose,
		user = null,
	}: {
		open: boolean
		onclose: () => void
		user?: User | null
	} = $props()

	const visibleNavOptions = $derived(
		navOptions.filter((option) => {
			if (user && option.title === 'Login') return false
			return true
		})
	)
</script>

<!-- Drawer Backdrop -->
{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-[2px] transition-opacity xl:hidden"
		onclick={onclose}
	></div>
{/if}

<!-- Drawer Panel -->
<aside
	class="fixed top-0 right-0 z-[70] h-svh w-80 max-w-[85vw] transform bg-paper shadow-2xl transition-transform duration-300 ease-out xl:hidden {open
		? 'translate-x-0'
		: 'translate-x-full'}"
	aria-hidden={!open}
	inert={!open}
>
	<div class="flex h-full flex-col">
		<header class="flex items-center justify-between border-b border-line px-5 py-4">
			<span class="font-display text-xl font-semibold">Menu</span>
			<button
				onclick={onclose}
				class="btn-icon text-ink hover:bg-primary-50"
				aria-label="Close menu"
			>
				<Icon icon="lucide:x" class="size-6" />
			</button>
		</header>

		<nav class="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
			{#each visibleNavOptions as option}
				{@const active =
					navigationState.activeNav !== '' &&
					option.href.includes(navigationState.activeNav)}
				<a
					onclick={onclose}
					href={option.href}
					class="flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-colors {active
						? 'bg-primary-700 text-white'
						: 'text-ink hover:bg-white'}"
				>
					<Icon
						icon={option.icon}
						class="size-5 {active ? 'text-secondary-200' : 'text-secondary-600'}"
					/>
					{option.title}
				</a>
			{/each}
		</nav>

		{#if user}
			<div class="border-t border-line p-4">
				<UserMenu {user} variant="drawer" onaction={onclose} />
			</div>
		{/if}

		<p class="border-t border-line px-5 py-4 text-sm text-muted">
			Sundays at 10:30 AM · 5225 Orbitor Dr, Mississauga
		</p>
	</div>
</aside>
