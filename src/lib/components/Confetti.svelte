<script lang="ts">
	// One-shot confetti burst from the top of the viewport. Purely decorative,
	// and skipped entirely for visitors who prefer reduced motion.
	let { onend }: { onend?: () => void } = $props()

	const colors = [
		'var(--color-primary-500)',
		'var(--color-secondary-400)',
		'var(--color-tertiary-400)',
		'var(--color-warning-400)',
		'var(--color-primary-200)',
	]

	const pieces = Array.from({ length: 80 }, (_, i) => ({
		left: Math.random() * 100,
		drift: (Math.random() - 0.5) * 30,
		spin: (Math.random() < 0.5 ? -1 : 1) * (360 + Math.random() * 720),
		delay: Math.random() * 400,
		duration: 1800 + Math.random() * 1400,
		width: 6 + Math.random() * 6,
		round: Math.random() < 0.3,
		color: colors[i % colors.length],
	}))

	const longest = Math.max(...pieces.map((p) => p.delay + p.duration))

	$effect(() => {
		const timer = setTimeout(() => onend?.(), longest)
		return () => clearTimeout(timer)
	})
</script>

<div
	class="pointer-events-none fixed inset-0 z-[100] overflow-hidden motion-reduce:hidden"
	aria-hidden="true"
>
	{#each pieces as p, i (i)}
		<span
			class="confetti absolute top-0 block"
			class:rounded-full={p.round}
			style:left="{p.left}%"
			style:width="{p.width}px"
			style:height="{p.round ? p.width : p.width * 1.6}px"
			style:background={p.color}
			style:--drift="{p.drift}vw"
			style:--spin="{p.spin}deg"
			style:animation-delay="{p.delay}ms"
			style:animation-duration="{p.duration}ms"
		></span>
	{/each}
</div>

<style>
	.confetti {
		opacity: 0;
		animation-name: confetti-fall;
		animation-timing-function: cubic-bezier(0.25, 0.6, 0.45, 1);
		animation-fill-mode: forwards;
	}

	@keyframes confetti-fall {
		0% {
			opacity: 1;
			transform: translate3d(0, -5vh, 0) rotate(0);
		}
		80% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: translate3d(var(--drift), 105vh, 0) rotate(var(--spin));
		}
	}
</style>
