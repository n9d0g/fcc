<script lang="ts">
	import { navOptions } from '$lib/config'
	import Icon from '@iconify/svelte'
	import UserMenu from '$lib/components/UserMenu.svelte'
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
		class="fixed inset-0 z-40 bg-surface-900/50 transition-opacity xl:hidden"
		onclick={onclose}
	></div>
{/if}

<!-- Drawer Panel -->
<aside
	class="fixed right-0 top-0 z-50 h-screen w-72 transform bg-white shadow-xl transition-transform duration-300 ease-in-out dark:bg-surface-900 xl:hidden {open
		? 'translate-x-0'
		: 'translate-x-full'}"
>
	<div class="flex h-full flex-col">
		<!-- Header -->
		<header
			class="flex items-center justify-between border-b border-surface-300-700 p-4"
		>
			<span class="text-lg font-bold">Menu</span>
			<button
				onclick={onclose}
				class="btn-icon text-gray-700 hover:preset-tonal dark:text-white"
				aria-label="Close menu"
			>
				<Icon icon="lucide:x" class="h-6 w-6" />
			</button>
		</header>

		<!-- Navigation Links -->
		<nav class="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
			{#each visibleNavOptions as option}
				<a
					onclick={onclose}
					href={option.href}
					class="btn justify-start gap-3 hover:preset-tonal"
				>
					<Icon icon={option.icon} class="h-5 w-5" />
					{option.title}
				</a>
			{/each}
		</nav>

		{#if user}
			<div class="border-t border-surface-300-700 p-4">
				<UserMenu {user} variant="drawer" onaction={onclose} />
			</div>
		{/if}
	</div>
</aside>
