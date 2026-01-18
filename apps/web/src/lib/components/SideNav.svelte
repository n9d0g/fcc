<script lang="ts">
	import { navOptions } from '$lib/constants'
	import Icon from '@iconify/svelte'

	// Svelte 5 props
	let { open, onclose }: { open: boolean; onclose: () => void } = $props()
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
	class="fixed right-0 top-0 z-50 h-screen w-72 transform bg-white dark:bg-surface-900 shadow-xl transition-transform duration-300 ease-in-out xl:hidden {open
		? 'translate-x-0'
		: 'translate-x-full'}"
>
	<div class="flex h-full flex-col">
		<!-- Header -->
		<header class="flex items-center justify-between border-b border-surface-300-700 p-4">
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
			{#each navOptions as option}
				{@const IconComponent = option.icon}
				<a
					onclick={onclose}
					href={option.href}
					class="btn justify-start gap-3 hover:preset-tonal"
				>
					<span class="flex h-5 w-5 items-center justify-center">
						<IconComponent />
					</span>
					{option.title}
				</a>
			{/each}
		</nav>
	</div>
</aside>
