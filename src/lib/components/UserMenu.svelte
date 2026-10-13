<script lang="ts">
	import { goto, refreshAll } from '$app/navigation'
	import type { User } from '@supabase/supabase-js'
	import { isAdmin } from '#lib/schemas/worship-team.js'

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
		await refreshAll()
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
		class="flex size-10 cursor-pointer items-center justify-center rounded-full bg-secondary-600 text-sm font-semibold text-white uppercase ring-2 ring-white transition hover:bg-secondary-700"
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
			class="card absolute z-[60] min-w-48 overflow-hidden shadow-lift {variant ===
			'drawer'
				? 'left-0 right-auto top-full mt-2 w-full'
				: 'right-0 top-full mt-2'}"
		>
			<div class="border-b border-line px-4 py-3">
				<p class="text-xs text-muted">Signed in as</p>
				<p class="truncate text-sm font-medium text-ink">
					{email || displayName}
				</p>
			</div>

			{#if isAdmin(user)}
				<a
					href="/admin/worship-requests"
					role="menuitem"
					class="flex w-full items-center px-4 py-3 text-left text-sm font-medium hover:bg-surface-100"
					onclick={() => {
						closeMenu()
						onaction?.()
					}}
				>
					Worship requests
				</a>
			{/if}

			<button
				type="button"
				role="menuitem"
				class="flex w-full cursor-pointer items-center px-4 py-3 text-left text-sm font-medium hover:bg-surface-100"
				onclick={handleLogout}
			>
				Log out
			</button>
		</div>
	{/if}
</div>
