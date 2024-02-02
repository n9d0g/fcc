<script lang="ts">
	export let items: any
</script>

<div
	class="logo-cloud my-8 grid-cols-1 gap-2 sm:grid-cols-2 md:my-16 lg:grid-cols-3"
>
	{#each items as card}
		<a
			href={card.link}
			class="logo-item flex items-center justify-start rounded-sm p-4 text-center text-white sm:justify-center md:h-64"
			data-sveltekit-preload-data="hover"
			style={`background-image: url(${card.backgroundImage});background-size: cover; opacity-10`}
		>
			<span class="flex items-center justify-between gap-4"
				><img
					src={card.icon}
					alt={`${card.title} Icon`}
					class="w-20 rounded-full border bg-green-800 p-2"
				/>
				<h2 class="h2 rounded-lg bg-slate-800 p-2">{card.title}</h2></span
			>
		</a>
	{/each}
</div>
