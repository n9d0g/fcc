<script lang="ts">
	import SermonCard from '$lib/components/sermons/SermonCard.svelte'
	export let sermons: any
</script>

<!-- sermons -->
<section class="container mx-auto my-16 min-h-2/6 flex flex-col justify-center gap-8 px-4">
	<h2 class="text-2xl font-bold text-center">Recent Sermons</h2>
	<div class="grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
		{#each sermons.slice(0, 3) as sermon}
			<SermonCard
				title={sermon.title}
				date={sermon.date}
				speaker={sermon.speaker}
				scripture={sermon.scripture}
				youtube={sermon.youtube}
				thumb={sermon.thumb}
			/>
		{/each}
	</div>
	<div class="flex justify-center">
		<a class="btn variant-filled" href="/sermons">View All Sermons</a>
	</div>
</section>
