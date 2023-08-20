<script lang="ts">
	export let items: any
</script>

<div class="logo-cloud my-8 grid-cols-1 gap-2 sm:grid-cols-2 md:my-16 lg:grid-cols-3">
	{#each items as card}
		<a
			href={card.link}
			class="logo-item flex items-center justify-center rounded-sm p-4 text-center md:h-64"
			data-sveltekit-preload-data="hover"
		>
			<h2 class="h2">{card.title}</h2>
		</a>
	{/each}
</div>
