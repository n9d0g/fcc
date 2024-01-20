<script lang="ts">
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton'
	import SermonCard from '$lib/components/sermons/SermonCard.svelte'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import { searchFilter } from '$lib/utils'
	import { fade } from 'svelte/transition'
	import FilterBy from '$lib/components/FilterBy.svelte'

	// props
	export let data

	// variables
	let bindVal = ''
	const { title, breadcrumb, headData } = data

	// functions
	const sortedSermons = () => {
		if (bindVal.length === 0) return data.sermons
		else return searchFilter(data.sermons, 'speaker', bindVal)
	}

	// pagination
	const source = Object.keys(sortedSermons())
	let paginationSettings = {
		page: 0,
		limit: 16,
		size: source.length,
		amounts: [1, 2, 4, 8, 16],
	} satisfies PaginationSettings

	$: paginatedSource = sortedSermons().slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit +
			paginationSettings.limit
	)
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<FilterBy label="Filter by speaker" bind:bindVal />

	<!-- sermon paginator -->
	{#key bindVal}
		{#if bindVal !== ''}
			<p
				transition:fade={{ duration: 150 }}
				class="mx-auto flex justify-center"
			>
				{sortedSermons().length} result{#if sortedSermons().length !== 1}s{/if} found:
			</p>
		{/if}
		<Paginator
			bind:settings={paginationSettings}
			showFirstLastButtons={true}
			class="my-8"
		/>
		<div
			class="xs:grid-cols-1 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
		>
			{#each paginatedSource as sermon}
				<SermonCard
					title={sermon.title}
					date={sermon.date}
					speaker={sermon.speaker}
					scripture={sermon.scripture}
					youtube={sermon.youtube}
				/>
			{/each}
		</div>
		<Paginator bind:settings={paginationSettings} class="my-8 md:hidden" />
	{/key}
</FccLayout>
