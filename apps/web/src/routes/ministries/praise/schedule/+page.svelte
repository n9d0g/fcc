<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import DetailsTooltip from '$lib/components/ministries/praise/DetailsTooltip.svelte'
	import { fade } from 'svelte/transition'
	import Icon from '@iconify/svelte'
	import PraiseAssignments from '$lib/components/ministries/praise/PraiseAssignments.svelte'
	import { updatedDataFiltered, searchFilter } from '$lib/utils'
	import { openPraiseModal } from '$lib/stores/modalStore.svelte'
	import { links } from '$lib/constants'
	import { format, addDays } from 'date-fns'

	// Svelte 5 props
	let { data }: { data: any } = $props()

	const { title, breadcrumb, headData, tHead, tBody, filterData, praiseAssignments } = data

	// State
	let filterTerm = $state('lead')
	let searchTerm = $state('')

	const upToDatePraiseData = updatedDataFiltered(data.praise, 'date')

	// Derived values
	let filteredData = $derived(searchFilter(upToDatePraiseData, filterTerm, searchTerm))

	// functions
	const openDetails = (week: any) => {
		openPraiseModal({
			date: week.date,
			series: week.series,
			title: week.topic,
			speaker: week.speaker,
			scripture: week.scripture,
			objective: week.objective,
			summary: week.summary,
			songs: week.songs,
			unavailableList: week.unavailableList,
			pdf: week.pdfURL,
		})
	}
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<div class="relative my-8 flex w-full flex-col gap-4 sm:max-w-fit">
		<!-- filter searching -->
		<label class="label flex items-center gap-2">
			<span class="w-fit sm:w-1/6">Filter by:</span>
			<select class="select w-auto flex-1 sm:w-5/6" bind:value={filterTerm}>
				{#each filterData as role}
					<option value={role.value}>{role.label}</option>
				{/each}
			</select>
		</label>

		<div class="relative">
			<input
				class="input relative w-full max-w-full sm:w-96"
				type="text"
				placeholder={`Filter by ${filterTerm}`}
				bind:value={searchTerm}
				data-testid="schedule-search"
			/>
			<!-- clear search button -->
			{#if searchTerm.length > 0}
			<button
				transition:fade={{ duration: 150 }}
				onclick={() => (searchTerm = '')}
				class="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 cursor-pointer rounded-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
			>
				<Icon icon="lucide:x" class="h-full w-full" />
			</button>
			{/if}
		</div>

		<!-- # of results  -->
		{#if searchTerm.length !== 0}
			<div class="transition-all">
				<h6 class="h6 text-center transition-all sm:text-left">
					{filteredData.length} week{filteredData.length === 1 ? '' : 's'} found.
				</h6>
			</div>
		{/if}
	</div>

	<DetailsTooltip />

	<!-- schedule table -->
	<div class="table-container relative h-[60vh] w-full overflow-auto">
		<table class="table-hover table-compact table" data-testid="schedule-table">
			<thead>
				<tr class="sticky top-0 z-10">
					{#each tHead as header, index}
						{#if index === 0}
							<th class="sticky left-0 z-30 bg-gray-100 dark:bg-surface-700">
								{header}
							</th>
						{:else}
							<th>{header}</th>
						{/if}
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each filteredData as week, rowIndex}
					<tr onclick={() => openDetails(week)} class="cursor-pointer">
						{#each tBody as col}
							{#if week[col]}
								{#if col === 'date'}
									<td class="sticky left-0 z-20 {rowIndex % 2 === 0 ? 'bg-white dark:bg-surface-800' : 'bg-gray-50 dark:bg-surface-900'}">
										{format(addDays(new Date(week[col]), 1), 'MMM do')}
									</td>
								{:else if col === 'unavailableList'}
									<td>
										{#each week[col] as unavailable, i}
											{unavailable.name}{i !== week[col].length - 1 ? '; ' : ''}
										{/each}
									</td>
								{:else}
									<td>
										{week[col]}
									</td>
								{/if}
							{:else}
								<td></td>
							{/if}
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<PraiseAssignments {praiseAssignments} />

	<!-- link to excel sheet -->
	<div class="my-4 flex w-full flex-col justify-center gap-4 sm:flex-row">
		<a href={links.avSetup} target="_blank" class="btn preset-filled">AV Setup Document</a>
		<a href="/pdf/x18-manual.pdf" target="_blank" class="btn preset-filled">Mixer Manual</a>
	</div>
</FccLayout>
