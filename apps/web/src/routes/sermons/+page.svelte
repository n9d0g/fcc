<script lang="ts">
	import SermonCard from '$lib/components/sermons/SermonCard.svelte'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import Paginator from '$lib/components/Paginator.svelte'
	import { searchFilter } from '$lib/utils'
	import { fade } from 'svelte/transition'
	import FilterBy from '$lib/components/FilterBy.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()

	// State
	let bindVal = $state('')
	let currentPage = $state(0)
	const pageSize = 16

	// Derived values from data (reactive when data changes)
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)

	// Derived values
	let sortedSermons = $derived.by(() => {
		if (bindVal.length === 0) return data.sermons
		return searchFilter(data.sermons, 'speaker', bindVal)
	})

	let paginatedSource = $derived(
		sortedSermons.slice(currentPage * pageSize, currentPage * pageSize + pageSize)
	)

	// Reset page when filter changes
	$effect(() => {
		if (bindVal) {
			currentPage = 0
		}
	})
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<FilterBy label="Filter by speaker" bind:bindVal />

	<!-- sermon paginator -->
	{#if bindVal !== ''}
		<p transition:fade={{ duration: 150 }} class="mx-auto flex justify-center">
			{sortedSermons.length} result{sortedSermons.length !== 1 ? 's' : ''} found:
		</p>
	{/if}

	<Paginator bind:page={currentPage} {pageSize} totalItems={sortedSermons.length} class="my-8" />

	<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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

	<Paginator
		bind:page={currentPage}
		{pageSize}
		totalItems={sortedSermons.length}
		class="my-8 md:hidden"
	/>
</FccLayout>
