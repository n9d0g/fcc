<script lang="ts">
	import { Paginator } from '@skeletonlabs/skeleton'
	import SermonCard from '$lib/components/sermons/SermonCard.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import { searchFilter } from '$lib/utils'
	import type { PageData } from './$types'
	import { breadcrumbs } from '$lib/constants'

	// props
	export let data: PageData

	// variables
	let speaker = ''

	// functions
	const sortedSermons = () => {
		if (speaker.length === 0) return data.sermons
		else return searchFilter(data.sermons, 'speaker', speaker)
	}

	// pagination
	const source = Object.keys(sortedSermons())
	let page = {
		offset: 0,
		limit: 4,
		size: source.length,
		amounts: [1, 2, 4, 8, 16],
	}

	const breadcrumb = [breadcrumbs.home, breadcrumbs.sermons]
</script>

<FccLayout {breadcrumb} title="FCC | Sermons">
	<PageTitle text="Sermons." />
	<label class="flex items-center label my-4 gap-2 max-w-fit">
		<input class="input w-64" type="text" placeholder="Filter by speaker" bind:value={speaker} />
	</label>
	{#key speaker}
		{#if speaker !== ''}
			<p class="flex justify-center mx-auto">
				{sortedSermons().length} result{#if sortedSermons().length !== 1}s{/if} found:
			</p>
		{/if}
		<Paginator bind:settings={page} class="my-8" />
		<div class="grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{#each sortedSermons().slice(page.offset * page.limit, page.offset * page.limit + page.limit) as sermon}
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
		<Paginator bind:settings={page} class="md:hidden my-8" />
	{/key}
</FccLayout>
