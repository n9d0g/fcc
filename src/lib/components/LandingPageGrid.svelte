<script lang="ts">
	export let items: any
</script>

<div class="my-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:my-16 lg:grid-cols-3">
	{#each items as card}
		<a href={card.link} class="card card-hover flex items-center justify-center rounded-md p-4 text-center md:h-64">
			<h2 class="h2">{card.title}</h2>
		</a>
	{/each}
</div>
