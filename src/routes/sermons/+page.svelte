<script lang="ts">
	import SermonCard from '$lib/sermons/SermonCard.svelte'
	import PageTitle from '$lib/PageTitle.svelte'
	import FccLayout from '$lib/FccLayout.svelte'
	import type { PageData } from './$types'

	// props
	export let data: PageData

	// variables
	let speaker = ''

	const sortedSermons = () => {
		if (speaker.length === 0) return data.sermons
		else
			return data.sermons.filter((item) =>
				item.speaker.toLowerCase().includes(speaker.toLowerCase())
			)
	}
</script>

<FccLayout title="FCC | Sermons">
	<PageTitle text="Sermons." />
	<label class="flex items-center label my-4 gap-2">
		<input class="input w-64" type="text" placeholder="Filter by speaker" bind:value={speaker} />
	</label>
	{#key speaker}
		<div class="grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{#each sortedSermons() as sermon}
				<SermonCard
					title={sermon.title}
					date={sermon.date}
					speaker={sermon.speaker}
					scripture={sermon.scripture}
					youtube={sermon.youtube}
				/>
			{/each}
		</div>
	{/key}
</FccLayout>
