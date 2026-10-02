<script lang="ts">
	// Svelte 5 props
	let { items }: { items: Array<{ title: string; link: string; external?: boolean }> } = $props()
</script>

<div class="logo-cloud my-8 grid-cols-1 gap-2 sm:grid-cols-2 md:my-16 lg:grid-cols-3">
	{#each items as card}
		<a
			href={card.link}
			target={card.external ? '_blank' : '_self'}
			class="logo-item flex items-center justify-center rounded-sm p-4 text-center md:h-64"
			data-sveltekit-preload-data="hover"
		>
			<h2 class="h2">{card.title}</h2>
		</a>
	{/each}
</div>
