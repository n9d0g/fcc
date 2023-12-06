<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton'
	import { getModalStore } from '@skeletonlabs/skeleton'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import DetailsTooltip from '$lib/components/ministries/praise/DetailsTooltip.svelte'
	import { fade } from 'svelte/transition'
	import IoIosClose from 'svelte-icons/io/IoIosClose.svelte'
	import WorshipAssignments from '$lib/components/ministries/praise/WorshipAssignments.svelte'
	import {
		updatedDataFiltered,
		praiseModalSettings,
		searchFilter,
		getMonthDay,
	} from '$lib/utils'
	import { praiseFilterPopupSettings, links } from '$lib/constants'

	// server fetching
	export let data
	const {
		title,
		breadcrumb,
		headData,
		worshipAssignments,
		tHead,
		tBody,
		filterData,
	}: any = data

	let schedTable: any
	let filterTerm = 'lead'
	let searchTerm = ''

	const modalStore = getModalStore()
	const upToDatePraiseData = updatedDataFiltered(data.praise, 'date')

	// functions
	const openDetails = (e: any) => {
		const meta = {
			series: e.series,
			title: e.topic,
			speaker: e.speaker,
			scripture: e.scripture,
			objective: e.objective,
			summary: e.summary,
			date: e.date,
			pdf: e.pdfURL,
		}

		const settings = praiseModalSettings(meta)
		modalStore.trigger(settings)
	}
</script>

<FccLayout {title} {breadcrumb} {headData}>
	{#await data}
		<div>awaiting data...</div>
	{:then data}
		<div class="relative my-8 flex w-full flex-col gap-4 sm:max-w-fit">
			<!-- filter searching -->
			<label class="label flex items-center gap-2">
				<span class="w-fit sm:w-1/6"> Filter by: </span>
				<!-- filter term -->
				<select class="select w-auto flex-1 sm:w-5/6" bind:value={filterTerm}>
					{#each filterData as role}
						<option value={role.value}>{role.label}</option>
					{/each}
				</select>
			</label>

			<input
				class="input relative w-full max-w-full sm:w-96"
				type="text"
				placeholder={`Filter by ${filterTerm}`}
				bind:value={searchTerm}
				use:popup={praiseFilterPopupSettings}
				data-testid="schedule-search"
			/>
			<!-- clear search button -->
			{#if searchTerm.length > 0}
				<button
					transition:fade={{ duration: 150 }}
					on:click={() => (searchTerm = '')}
					class="absolute right-2 top-[69px] h-7 w-7 cursor-pointer rounded-xl"
				>
					<IoIosClose />
				</button>
			{/if}

			<!-- # of results  -->
			{#if searchTerm.length !== 0}
				<div class="absolute top-[98px] w-full transition-all">
					<h6 class="h6 mt-4 text-center transition-all sm:text-left">
						{searchFilter(upToDatePraiseData, filterTerm, searchTerm).length} week{searchFilter(
							upToDatePraiseData,
							filterTerm,
							searchTerm
						).length === 1
							? ''
							: 's'}
						found.
					</h6>
				</div>
			{/if}
		</div>

		<DetailsTooltip />

		<!-- schedule table -->
		<div bind:this={schedTable}>
			<div class="table-container relative h-[60vh] w-full">
				<table
					class="table table-hover table-compact relative overflow-scroll"
					data-testid="schedule-table"
				>
					<thead>
						<tr class="bg-surface-200-700-token sticky top-0 z-10">
							{#each tHead as header, index}
								{#if index === 0}
									<th
										class="bg-surface-200-700-token table-cell-fit sticky left-0 z-30 p-3 text-left font-bold"
									>
										{header}
									</th>
								{:else}
									<th class="table-cell-fit p-3 text-left font-bold"
										>{header}</th
									>
								{/if}
							{/each}
						</tr>
					</thead>
					{#key searchTerm}
						<tbody>
							{#each searchFilter(upToDatePraiseData, filterTerm, searchTerm) as week}
								<tr on:click={() => openDetails(week)} class="cursor-pointer">
									{#each tBody as col}
										{#if week[col]}
											{#if col === 'date'}
												<td
													class="bg-surface-200-700-token table-cell-fit sticky left-0 pl-3 text-left"
												>
													{getMonthDay(week[col])}
												</td>
											{:else}
												<td class="whitespace-nowrap pl-3 text-left"
													>{week[col]}</td
												>
											{/if}
										{:else}
											<td class="text-left" />
										{/if}
									{/each}
								</tr>
							{/each}
						</tbody>
					{/key}
				</table>
			</div>
		</div>

		<!-- link to excel sheet -->
		<div class="my-8 flex w-full justify-center">
			<a href={links.excel} target="_blank" class="variant-filled btn">
				Excel Data Sheet
			</a>
		</div>

		<hr />

		<WorshipAssignments worshipAssignmentsData={worshipAssignments} />
	{/await}
</FccLayout>
