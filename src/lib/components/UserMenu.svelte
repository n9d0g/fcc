<script lang="ts">
	import { goto, refreshAll } from '$app/navigation'
	import { page } from '$app/state'
	import Icon from '@iconify/svelte'
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
	// Set at signup (user_metadata.display_name); older accounts fall back to email
	const metadataName = $derived(
		typeof user.user_metadata?.display_name === 'string'
			? user.user_metadata.display_name.trim()
			: ''
	)
	const displayName = $derived(
		metadataName || (email ? email.split('@')[0] : 'User')
	)
	const initials = $derived(getInitials(displayName))

	type MenuGroup = {
		label?: string
		/** Shown only to admins, and marked with a shield */
		admin?: boolean
		/** `admin` items are only listed for admins, and marked with a shield */
		items: { href: string; label: string; icon: string; admin?: boolean }[]
	}

	const groups = $derived<MenuGroup[]>([
		{
			items: [{ href: '/account', label: 'Edit profile', icon: 'lucide:user-pen' }],
		},
		{
			label: 'Worship',
			items: [
				{
					href: '/ministries/praise/schedule',
					label: 'Schedule',
					icon: 'lucide:calendar-days',
				},
				{
					href: '/ministries/praise/availability',
					label: 'My availability',
					icon: 'lucide:calendar-x',
				},
				{
					href: '/ministries/praise/song-usage',
					label: 'Song usage',
					icon: 'lucide:list-music',
					admin: true,
				},
			].filter((item) => !item.admin || isAdmin(user)),
		},
		// Only once they've been approved to write (from the root layout)
		...(page.data.isBlogAuthor
			? [
					{
						label: 'Blog',
						items: [
							{
								href: '/blog/write',
								label: 'My blog posts',
								icon: 'lucide:notebook-pen',
							},
						],
					},
				]
			: []),
		...(isAdmin(user)
			? [
					{
						label: 'Admin',
						admin: true,
						items: [
							{
								href: '/admin/worship-requests',
								label: 'Worship requests',
								icon: 'lucide:music',
							},
							{
								href: '/admin/availability',
								label: 'Team availability',
								icon: 'lucide:users',
							},
							{ href: '/admin/blog', label: 'Blog approvals', icon: 'lucide:file-check' },
						],
					},
				]
			: []),
	])

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
			class="card absolute z-[60] min-w-60 overflow-hidden shadow-lift {variant ===
			'drawer'
				? 'left-0 right-auto top-full mt-2 w-full'
				: 'right-0 top-full mt-2'}"
		>
			<div class="border-b border-line px-4 py-3">
				<p class="text-xs text-muted">Signed in as</p>
				{#if metadataName}
					<p class="truncate text-sm font-medium text-ink">{metadataName}</p>
					<p class="truncate text-xs text-muted">{email}</p>
				{:else}
					<p class="truncate text-sm font-medium text-ink">
						{email || displayName}
					</p>
				{/if}
			</div>

			{#each groups as group, i (group.label ?? i)}
				<div
					role="group"
					aria-labelledby={group.label ? `user-menu-${group.label}` : undefined}
					class="border-b border-line py-1"
				>
					{#if group.label}
						<p
							id="user-menu-{group.label}"
							title={group.admin ? 'Only admins can see this section' : undefined}
							class="flex items-center gap-1.5 px-4 pt-2 pb-1 text-xs font-semibold tracking-wide text-muted uppercase"
						>
							{#if group.admin}
								<Icon icon="lucide:shield-check" class="size-3.5 text-secondary-600" />
							{/if}
							{group.label}
							{#if group.admin}
								<span class="sr-only">(only visible to admins)</span>
							{/if}
						</p>
					{/if}
					{#each group.items as item (item.href)}
						<a
							href={item.href}
							role="menuitem"
							class="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium hover:bg-surface-100"
							onclick={() => {
								closeMenu()
								onaction?.()
							}}
						>
							<Icon icon={item.icon} class="size-4 shrink-0 text-muted" />
							{item.label}
							{#if item.admin}
								<span class="ml-auto" title="Only admins can see this">
									<Icon icon="lucide:shield-check" class="size-3.5 text-secondary-600" />
									<span class="sr-only">(only visible to admins)</span>
								</span>
							{/if}
						</a>
					{/each}
				</div>
			{/each}

			<button
				type="button"
				role="menuitem"
				class="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-sm font-medium hover:bg-surface-100"
				onclick={handleLogout}
			>
				<Icon icon="lucide:log-out" class="size-4 shrink-0 text-muted" />
				Log out
			</button>
		</div>
	{/if}
</div>
