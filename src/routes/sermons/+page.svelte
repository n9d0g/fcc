<script lang="ts">
	import { Paginator } from '@skeletonlabs/skeleton'
	import SermonCard from '$lib/components/sermons/SermonCard.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import { searchFilter } from '$lib/utils'
	import { breadcrumbs } from '$lib/constants'
	import IoIosClose from 'svelte-icons/io/IoIosClose.svelte'
	import { fade } from 'svelte/transition'

	// props
	export let data

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

<FccLayout {breadcrumb} headData={data.headData}>
	<PageTitle text="Sermons." />
	<label class="items-left label relative my-4 flex max-w-fit flex-col gap-2">
		<span>Filter by speaker:</span>
		<input class="input w-64" type="text" placeholder="Filter by speaker" bind:value={speaker} />
		{#if speaker !== ''}
			<button
				transition:fade={{ duration: 150 }}
				on:click={() => (speaker = '')}
				class="absolute right-2 top-10 h-7 w-7 cursor-pointer rounded-xl"
			>
				<IoIosClose />
			</button>
		{/if}
	</label>
	{#key speaker}
		{#if speaker !== ''}
			<p transition:fade={{ duration: 150 }} class="mx-auto flex justify-center">
				{sortedSermons().length} result{#if sortedSermons().length !== 1}s{/if} found:
			</p>
		{/if}
		<Paginator bind:settings={page} class="my-8" />
		<div class="xs:grid-cols-1 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
		<Paginator bind:settings={page} class="my-8 md:hidden" />
	{/key}
</FccLayout>
