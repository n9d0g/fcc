<script lang="ts">
	import Icon from '@iconify/svelte'
	import { onMount } from 'svelte'
	import type { ChurchScene } from '#lib/three/church-scene.js'

	// Animated 3D model of the building, next to the map so visitors know what
	// to look for. three.js (~150 KB gzipped) is only downloaded once this
	// scrolls near the screen, and rendering pauses while it's out of view.
	let { class: className = '' }: { class?: string } = $props()

	let container = $state<HTMLElement | null>(null)
	let canvas = $state<HTMLCanvasElement | null>(null)
	let status = $state<'idle' | 'loading' | 'ready' | 'error'>('idle')
	let reducedMotion = $state(false)
	// Lights on in the evening, local time
	const hour = new Date().getHours()
	let night = $state(hour < 6 || hour >= 19)

	let scene: ChurchScene | null = null

	onMount(() => {
		reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
		let inView = false
		let destroyed = false

		const load = async () => {
			status = 'loading'
			try {
				const { createChurchScene } = await import('#lib/three/church-scene.js')
				if (destroyed || !canvas) return
				scene = createChurchScene(canvas, { reducedMotion, night })
				status = 'ready'
				if (inView && !document.hidden) scene.start()
			} catch (e) {
				console.error('[church-3d]', e)
				status = 'error'
			}
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				inView = entry.isIntersecting
				if (inView && status === 'idle') load()
				if (inView && !document.hidden) scene?.start()
				else scene?.stop()
			},
			{ rootMargin: '200px' }
		)
		if (container) observer.observe(container)

		const onVisibility = () => {
			if (document.hidden || !inView) scene?.stop()
			else scene?.start()
		}
		document.addEventListener('visibilitychange', onVisibility)

		return () => {
			destroyed = true
			observer.disconnect()
			document.removeEventListener('visibilitychange', onVisibility)
			scene?.dispose()
			scene = null
		}
	})

	const toggleNight = () => {
		night = !night
		scene?.setNight(night)
	}
</script>

<figure bind:this={container} class="card flex flex-col overflow-hidden p-0 {className}">
	<div class="relative min-h-72 flex-1 bg-tertiary-50 md:min-h-80">
		<canvas
			bind:this={canvas}
			class="absolute inset-0 size-full cursor-grab transition-opacity duration-700 active:cursor-grabbing {status ===
			'ready'
				? 'opacity-100'
				: 'opacity-0'}"
			aria-hidden="true"
		></canvas>
		<p class="sr-only">
			3D model of 5225 Orbitor Drive: a long beige building with red tile and a yellow stripe
			along the bottom, arched entrances and sloped glass sunrooms, with parking across the
			aisle. A car drives to the far end and parks across from Unit 3, where the entrance is
			inside the arch beside the Kalayaan Community Centre sign.
		</p>

		{#if status !== 'ready'}
			<div class="absolute inset-0 grid place-items-center text-sm text-muted">
				{#if status === 'error'}
					<p class="px-6 text-center">The 3D view isn't supported on this device.</p>
				{:else}
					<span class="flex items-center gap-2">
						<Icon icon="lucide:loader-circle" class="size-5 animate-spin" />
						Building the church…
					</span>
				{/if}
			</div>
		{/if}

		{#if status === 'ready'}
			<div class="absolute top-3 right-3 flex gap-2">
				<button
					type="button"
					class="btn btn-sm bg-white/85 shadow-soft backdrop-blur hover:bg-white"
					aria-pressed={night}
					onclick={toggleNight}
				>
					<Icon icon={night ? 'lucide:sun' : 'lucide:moon'} class="size-4" />
					{night ? 'Day' : 'Night'}
				</button>
				{#if !reducedMotion}
					<button
						type="button"
						class="btn btn-sm bg-white/85 shadow-soft backdrop-blur hover:bg-white"
						onclick={() => scene?.replay()}
					>
						<Icon icon="lucide:rotate-ccw" class="size-4" />
						Replay
					</button>
				{/if}
			</div>
		{/if}
	</div>
	<figcaption class="flex items-start gap-2 border-t border-line p-4 text-sm">
		<Icon icon="lucide:map-pin" class="mt-0.5 size-4 shrink-0 text-secondary-600" />
		<span>
			Drive all the way to the far end of the lot to <strong>Unit 3</strong>, then look for the
			<strong>Kalayaan Community Centre</strong> sign. Our door is just inside the arch, on the
			left.
			<span class="text-muted">Drag sideways to look around.</span>
		</span>
	</figcaption>
</figure>
