<script lang="ts">
	// Svelte 5 props
	let { text, link, nav }: { text: string; link: string; nav: string } = $props()

	// Derived state
	let activeNav = $derived.by(() => {
		if (link === '/' && nav === 'home') return true
		return link.includes(nav)
	})

	const nonActiveClass = 'hover:font-bold text-gray-700 dark:text-white'
	const activeClass = 'font-bold text-primary-600 dark:text-primary-400'
</script>

<a
	href={link}
	class="btn btn-icon z-20 w-fit whitespace-nowrap rounded-lg px-2 text-sm {!activeNav
		? nonActiveClass
		: activeClass}"
>
	{text}
</a>
