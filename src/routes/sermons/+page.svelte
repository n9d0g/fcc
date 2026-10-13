<script lang="ts">
	import SermonCard from '#lib/components/sermons/SermonCard.svelte'
	import FccLayout from '#lib/components/FccLayout.svelte'
	import Paginator from '#lib/components/Paginator.svelte'
	import { searchFilter } from '#lib/utils.js'
	import { fade } from 'svelte/transition'
	import FilterBy from '#lib/components/FilterBy.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()

	// State
	let bindVal = $state('')
	let currentPage = $state(0)
	// Multiple of 2 and 3 so the last row fills on tablet and desktop grids
	const pageSize = 18

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
		void bindVal
		currentPage = 0
	})

	// Scroll to top when pagination changes (especially on mobile)
	$effect(() => {
		void currentPage
		if (typeof window !== 'undefined') {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	})
</script>

<FccLayout
	{title}
	{breadcrumb}
	{headData}
	intro="Catch up on recent messages from our Sunday services."
>
	<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
		<FilterBy label="Filter by speaker" bind:bindVal />
		<Paginator
			bind:page={currentPage}
			{pageSize}
			totalItems={sortedSermons.length}
			class="md:justify-end"
		/>
	</div>

	<!-- sermon paginator -->
	{#if bindVal !== ''}
		<p transition:fade={{ duration: 150 }} class="mt-4 text-sm text-muted">
			{sortedSermons.length} result{sortedSermons.length !== 1 ? 's' : ''} found:
		</p>
	{/if}

	<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each paginatedSource as sermon (sermon._id)}
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
		class="mt-12"
	/>
</FccLayout>
