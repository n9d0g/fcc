<script lang="ts">
	import SermonCard from '$lib/sermons/SermonCard.svelte'
	import PageTitle from '$lib/PageTitle.svelte'
	import FccLayout from '$lib/FccLayout.svelte'
	import type { PageData } from './$types'
	import { Paginator } from '@skeletonlabs/skeleton'

	// props
	export let data: PageData

	// variables
	let speaker = ''

	// functions
	const sortedSermons = () => {
		if (speaker.length === 0) return data.sermons
		else
			return data.sermons.filter((item) =>
				item.speaker.toLowerCase().includes(speaker.toLowerCase())
			)
	}

	// pagination
	const source = Object.keys(sortedSermons())
	let page = {
		offset: 0,
		limit: 4,
		size: source.length,
		amounts: [1, 2, 4, 8, 16],
	}
</script>

<FccLayout title="FCC | Sermons">
	<PageTitle text="Sermons." />
	<label class="flex items-center label my-4 gap-2 max-w-fit">
		<input class="input w-64" type="text" placeholder="Filter by speaker" bind:value={speaker} />
	</label>
	<Paginator bind:settings={page} class="my-8" />
	{#key speaker}
		<div class="grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{#each sortedSermons().slice(page.offset * page.limit, page.offset * page.limit + page.limit) as sermon}
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
