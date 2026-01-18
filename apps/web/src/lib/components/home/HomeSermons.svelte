<script lang="ts">
	import SermonCard from '$lib/components/sermons/SermonCard.svelte'

	// Svelte 5 props
	let {
		sermons,
	}: {
		sermons: Array<{
			title: string
			date: string
			speaker: string
			scripture: string
			youtube: string
		}>
	} = $props()
</script>

<section class="container mx-auto my-16 flex h-fit flex-col justify-center gap-8 px-4">
	<h2 class="h2 text-center text-4xl font-bold">Recent Sermons</h2>
	<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
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
			class="btn btn-lg bg-surface-200 text-surface-900 dark:bg-surface-700 dark:text-surface-50"
			href="/sermons"
			data-sveltekit-preload-data="hover"
		>
			View All Sermons
		</a>
	</div>
</section>
