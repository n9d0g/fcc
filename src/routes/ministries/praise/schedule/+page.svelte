<script lang="ts">
	// imports
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton'
	import { Autocomplete } from '@skeletonlabs/skeleton'
	import { modalStore } from '@skeletonlabs/skeleton'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import DetailsTooltip from '$lib/components/ministries/praise/DetailsTooltip.svelte'
	import { updatedDataFiltered, praiseModalSettings, searchFilter } from '$lib/utils'
	import { praiseLeaderOptions, praiseFilterPopupSettings, breadcrumbs, links } from '$lib/constants'
	import { fade } from 'svelte/transition'
	import IoIosClose from 'svelte-icons/io/IoIosClose.svelte'

	// server fetching
	export let data

	// variables
	let tHead: any = data.tableHeader
	let tBody: any = data.tableBody
	let schedTable: any
	let leader = ''
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

	const onFilterSelection = (e: any) => {
		leader = e.detail.label
	}

	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.ministries,
		breadcrumbs.ministries.praise,
		breadcrumbs.ministries.praise.schedule,
	]
</script>

<FccLayout {breadcrumb} headData={data.headData}>
	<PageTitle text="Praise Schedule." />
	<div class="relative my-8 flex max-w-fit flex-col gap-4">
		<label class="label" for="autocomplete">Filter by leader:</label>
		<input
			id="autocomplete"
			class="autocomplete input w-64 max-w-full"
			type="text"
			placeholder="Filter by leader"
			bind:value={leader}
			use:popup={praiseFilterPopupSettings}
			data-testid="schedule-search"
		/>
		{#if leader.length > 0}
			<button
				transition:fade={{ duration: 150 }}
				on:click={() => (leader = '')}
				class="absolute right-2 top-[47px] h-7 w-7 cursor-pointer rounded-xl"
			>
				<IoIosClose />
			</button>
		{/if}
	</div>

	<div data-popup="praiseAutocomplete" class="z-30 w-64 rounded-md p-4 text-left bg-surface-100-800-token">
		<Autocomplete
			bind:input={leader}
			options={praiseLeaderOptions}
			on:selection={onFilterSelection}
			emptyState="No results found 🙈"
			class=""
		/>
	</div>

	<DetailsTooltip />

	<!-- schedule table -->
	<div bind:this={schedTable}>
		<div class="table-container relative h-[60vh] w-full">
			<table class="table-hover table-compact relative table overflow-scroll" data-testid="schedule-table">
				<thead>
					<tr class="variant-filled-secondary sticky top-0 z-10">
						{#each tHead as header, index}
							{#if index === 0}
								<th class="table-cell-fit variant-filled-secondary sticky left-0 z-30 p-3 text-left font-bold">
									{header}
								</th>
							{:else}
								<th class="table-cell-fit p-3 text-left font-bold">{header}</th>
							{/if}
						{/each}
					</tr>
				</thead>
				{#key leader}
					<tbody>
						{#each searchFilter(upToDatePraiseData, 'lead', leader) as week}
							<tr on:click={() => openDetails(week)} class="cursor-pointer">
								{#each tBody as col}
									{#if week[col]}
										{#if col === 'date'}
											<td class="table-cell-fit sticky left-0 pl-3 text-left bg-surface-100-800-token">
												{week[col]}
											</td>
										{:else}
											<td class="whitespace-nowrap pl-3 text-left">{week[col]}</td>
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
		<a href={links.excel} target="_blank" class="btn variant-filled"> Excel Data Sheet </a>
	</div>
</FccLayout>
