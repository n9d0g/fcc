<script lang="ts">
	// Svelte 5 props
	let { text, link, nav }: { text: string; link: string; nav: string } = $props()

	// Derived state
	let activeNav = $derived.by(() => {
		if (link === '/' && nav === 'home') return true
		return nav !== '' && link.includes(nav)
	})
</script>

<a
	href={link}
	aria-current={activeNav ? 'page' : undefined}
	class="relative rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors {activeNav
		? 'text-primary-800'
		: 'text-muted hover:bg-primary-50 hover:text-ink'}"
>
	{text}
	{#if activeNav}
		<span
			class="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-secondary-500"
			aria-hidden="true"
		></span>
	{/if}
</a>
