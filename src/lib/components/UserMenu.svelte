<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation'
	import type { User } from '@supabase/supabase-js'

	let {
		user,
		variant = 'header',
		onaction,
	}: {
		user: User
		variant?: 'header' | 'drawer'
		onaction?: () => void
	} = $props()

	let open = $state(false)
	let rootEl = $state<HTMLDivElement | null>(null)

	const email = $derived(user.email ?? '')
	const displayName = $derived(email ? email.split('@')[0] : 'User')
	const initials = $derived(getInitials(displayName))

	function getInitials(name: string) {
		const parts = name.trim().split(/[\s._-]+/).filter(Boolean)
		if (parts.length >= 2) {
			return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
		}
		return name.slice(0, 2).toUpperCase()
	}

	function toggleMenu() {
		open = !open
	}

	function closeMenu() {
		open = false
	}

	async function handleLogout() {
		closeMenu()
		onaction?.()
		await fetch('/logout', { method: 'POST', credentials: 'same-origin' })
		await invalidateAll()
		await goto('/')
	}

	function handleDocumentClick(event: MouseEvent) {
		const target = event.target as Node
		if (!open) return
		if (rootEl && !rootEl.contains(target)) {
			closeMenu()
		}
	}

	function handleDocumentKeydown(event: KeyboardEvent) {
		if (open && event.key === 'Escape') {
			closeMenu()
		}
	}

	$effect(() => {
		if (!open) return

		document.addEventListener('click', handleDocumentClick)
		document.addEventListener('keydown', handleDocumentKeydown)

		return () => {
			document.removeEventListener('click', handleDocumentClick)
			document.removeEventListener('keydown', handleDocumentKeydown)
		}
	})
</script>

<div
	bind:this={rootEl}
	class="relative {variant === 'drawer' ? 'w-full' : ''}"
>
	<button
		type="button"
		class="flex size-10 cursor-pointer items-center justify-center rounded-full preset-filled-secondary-500 text-sm font-semibold uppercase text-white transition-opacity hover:opacity-90"
		aria-label="Account menu"
		aria-haspopup="menu"
		aria-expanded={open}
		onclick={(event) => {
			event.stopPropagation()
			toggleMenu()
		}}
	>
		{initials}
	</button>

	{#if open}
		<div
			role="menu"
			class="card absolute z-[60] min-w-[12rem] overflow-hidden border border-gray-200 bg-white shadow-lg dark:border-surface-600 dark:bg-surface-800 {variant ===
			'drawer'
				? 'left-0 right-auto top-full mt-2 w-full'
				: 'right-0 top-full mt-2'}"
		>
			<div class="border-b border-gray-200 px-4 py-3 dark:border-surface-600">
				<p class="text-xs text-gray-500 dark:text-surface-400">Signed in as</p>
				<p class="truncate text-sm font-medium text-gray-900 dark:text-surface-50">
					{email || displayName}
				</p>
			</div>

			<button
				type="button"
				role="menuitem"
				class="btn w-full cursor-pointer justify-start rounded-none border-0 bg-transparent px-4 py-3 text-left text-sm hover:bg-gray-100 dark:hover:bg-surface-700"
				onclick={handleLogout}
			>
				Log out
			</button>
		</div>
	{/if}
</div>
