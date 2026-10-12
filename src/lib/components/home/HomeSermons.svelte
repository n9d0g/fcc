<script lang="ts">
	import Icon from '@iconify/svelte'
	import SermonCard from '#lib/components/sermons/SermonCard.svelte'

	// Svelte 5 props
	let {
		sermons,
	}: {
		sermons: Array<{
			_id: string
			title: string
			date: string
			speaker: string
			scripture: string
			youtube: string
		}>
	} = $props()
</script>

<section class="section border-y border-line bg-surface-100/70">
	<div class="wrap">
		<div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
			<div>
				<p class="eyebrow">Messages</p>
				<h2 class="h2 mt-3">Recent sermons</h2>
			</div>
			<a
				class="btn btn-outline shrink-0 self-start md:self-auto"
				href="/sermons"
				data-sveltekit-preload-data="hover"
			>
				View all sermons
				<Icon icon="lucide:arrow-right" class="size-4" />
			</a>
		</div>
		<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each sermons.slice(0, 3) as sermon (sermon._id)}
				<SermonCard
					title={sermon.title}
					date={sermon.date}
					speaker={sermon.speaker}
					scripture={sermon.scripture}
					youtube={sermon.youtube}
				/>
			{/each}
		</div>
	</div>
</section>
