<script lang="ts">
	import SermonCard from '$lib/components/sermons/SermonCard.svelte'
	export let sermons: any
</script>

<section
	class="container mx-auto my-16 flex h-fit flex-col justify-center gap-8 px-4"
>
	<h2 class="h2 text-center text-4xl font-bold">Recent Sermons</h2>
	<div
		class="xs:grid-cols-1 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
	>
		{#each sermons.slice(0, 3) as sermon}
			<SermonCard
				title={sermon.title}
				date={sermon.date}
				speaker={sermon.speaker}
				scripture={sermon.scripture}
				youtube={sermon.youtube}
			/>
		{/each}
	</div>
	<div class="flex justify-center">
		<a
			class="bg-surface-200-700-token btn btn-lg text-black dark:text-white"
			href="/sermons"
			data-sveltekit-preload-data="hover">View All Sermons</a
		>
	</div>
</section>
