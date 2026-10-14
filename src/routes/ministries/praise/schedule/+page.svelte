<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import DetailsTooltip from '#lib/components/ministries/praise/DetailsTooltip.svelte'
	import { fade } from 'svelte/transition'
	import Icon from '@iconify/svelte'
	import PraiseAssignments from '#lib/components/ministries/praise/PraiseAssignments.svelte'
	import { updatedDataFiltered, searchFilter } from '#lib/utils.js'
	import { openPraiseModal } from '#lib/stores/modalStore.svelte.js'
	import { links } from '#lib/config/index.js'
	import { formatCmsDate } from '#lib/utils.js'

	// Svelte 5 props
	let { data }: { data: any } = $props()

	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
	let tHead = $derived(data.tHead)
	let tBody = $derived(data.tBody)
	let filterData = $derived(data.filterData)
	let praiseAssignments = $derived(data.praiseAssignments)

	// State
	let filterTerm = $state('lead')
	let searchTerm = $state('')

	let upToDatePraiseData = $derived(updatedDataFiltered(data.praise, 'date'))

	// Derived values
	let filteredData = $derived(
		searchFilter(upToDatePraiseData, filterTerm, searchTerm)
	)

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
	{#if upToDatePraiseData && upToDatePraiseData.length > 0}
		<div class="relative my-8 flex w-full flex-col gap-4 sm:max-w-fit">
			<!-- filter searching -->
			<label class="label flex items-center gap-2">
				<span class="w-fit sm:w-1/6">Filter by:</span>
				<select
					class="select w-auto flex-1 cursor-pointer sm:w-5/6"
					bind:value={filterTerm}
				>
					{#each filterData as role}
						<option value={role.value}>{role.label}</option>
					{/each}
				</select>
			</label>

			<div class="relative">
				<input
					class="input w-full pr-10 sm:w-96"
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
						class="btn-icon absolute top-1/2 right-1.5 -translate-y-1/2 text-muted hover:bg-surface-100 hover:text-ink"
						aria-label="Clear search"
					>
						<Icon icon="lucide:x" class="size-4" />
					</button>
				{/if}
			</div>

			<!-- # of results  -->
			{#if searchTerm.length !== 0}
				<div class="transition-all">
					<p class="text-center text-sm text-muted sm:text-left">
						{filteredData.length} week{filteredData.length === 1 ? '' : 's'} found.
					</p>
				</div>
			{/if}
		</div>

		<DetailsTooltip />

		<!-- schedule table -->
		<div class="table-container relative max-h-[60vh] w-full overflow-auto">
			<table class="table-compact table" data-testid="schedule-table">
				<thead class="sticky-head">
					<tr>
						{#each tHead as header, index}
							{#if index === 0}
								<th class="sticky-col">{header}</th>
							{:else}
								<th>{header}</th>
							{/if}
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each filteredData as week}
						<tr onclick={() => openDetails(week)} class="cursor-pointer">
							{#each tBody as col}
								{#if week[col]}
									{#if col === 'date'}
										<td class="sticky-col whitespace-nowrap">
											{formatCmsDate(week[col], 'MMM do')}
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
	{:else}
		<div class="card my-8 p-8 text-center">
			<Icon icon="lucide:calendar-x" class="mx-auto mb-4 h-16 w-16 text-surface-400" />
			<h3 class="h3 mb-2">No Schedule Available</h3>
			<p class="text-muted">
				A schedule hasn't been created yet. Please check back later.
			</p>
		</div>
	{/if}

	<PraiseAssignments {praiseAssignments} />

	<!-- link to excel sheet -->
	<div class="my-4 flex w-full flex-col justify-center gap-3 sm:flex-row">
		<a href={links.avSetup} target="_blank" class="btn btn-primary">
			<Icon icon="lucide:monitor-speaker" class="size-4" />
			AV Setup Document
		</a>
		<a href="/pdf/x18-manual.pdf" target="_blank" class="btn btn-outline">
			<Icon icon="lucide:file-text" class="size-4" />
			Mixer Manual
		</a>
	</div>
</FccLayout>
