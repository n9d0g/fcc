<script lang="ts">
	import Icon from '@iconify/svelte'
	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'
	import { torontoToday } from '#lib/schemas/worship-availability.js'

	let { banner }: { banner: App.Banner | undefined } = $props()

	// Remembered per banner version, so an edited banner shows again
	let dismissKey = $derived(
		banner ? `fcc-banner-dismissed:${banner._id}:${banner._updatedAt}` : ''
	)

	let mounted = $state(false)
	let dismissed = $state(false)
	let reduceMotion = $state(false)

	onMount(() => {
		reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		try {
			dismissed = !!dismissKey && localStorage.getItem(dismissKey) === '1'
		} catch {}
		// Slide in just after the page settles so the motion catches the eye
		const timer = setTimeout(() => (mounted = true), 600)
		return () => clearTimeout(timer)
	})

	// The server already filters by date; this covers pages served from cache
	let visible = $derived(
		mounted && !!banner && !dismissed && torontoToday() <= banner.date
	)

	const dismiss = () => {
		dismissed = true
		try {
			localStorage.setItem(dismissKey, '1')
		} catch {}
	}

	const linkFor = (block: NonNullable<App.Banner['body']>[number], marks: string[]) =>
		block.markDefs?.find((def) => marks.includes(def._key))?.href
</script>

{#if visible && banner}
	<aside
		transition:fly={{ y: 80, duration: reduceMotion ? 0 : 400 }}
		aria-labelledby="site-banner-title"
		class="fixed inset-x-4 bottom-4 z-[999] mx-auto max-w-xl rounded-2xl bg-primary-900 text-white shadow-lift ring-1 ring-white/10 md:bottom-6"
	>
		<div class="flex items-start gap-3 p-4 md:gap-4 md:p-5">
			<span
				class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary-300 text-primary-950"
				aria-hidden="true"
			>
				<Icon icon="lucide:megaphone" class="size-5" />
			</span>

			<div class="min-w-0 flex-1">
				<p class="text-[0.7rem] font-semibold tracking-[0.18em] text-secondary-300 uppercase">
					Announcement
				</p>
				<h2
					id="site-banner-title"
					class="mt-0.5 font-display text-lg text-white leading-snug font-semibold text-balance md:text-xl"
				>
					{banner.title ?? 'Announcement'}
				</h2>
				{#each banner.body ?? [] as block (block._key)}
					<p class="mt-1 text-sm leading-relaxed text-white/85 md:text-base">
						{#each block.children as child (child._key)}
							{@const href = linkFor(block, child.marks)}
							{@const cls = [
								child.marks.includes('strong') && 'font-semibold text-white',
								child.marks.includes('em') && 'italic',
							]}
							{#if href}
								<a
									{href}
									class={[
										cls,
										'font-semibold text-white underline decoration-secondary-300 decoration-2 underline-offset-2 hover:decoration-white',
									]}
								>
									{child.text}
								</a>
							{:else if child.marks.length}
								<span class={cls}>{child.text}</span>
							{:else}
								{child.text}
							{/if}
						{/each}
					</p>
				{/each}
			</div>

			<button
				onclick={dismiss}
				class="-m-1 shrink-0 cursor-pointer rounded-full p-2 text-white/70 transition-colors hover:bg-white/15 hover:text-white focus-visible:ring-2 focus-visible:ring-secondary-300 focus-visible:outline-none"
				aria-label="Dismiss announcement"
			>
				<Icon icon="lucide:x" class="size-5" />
			</button>
		</div>
	</aside>
{/if}
