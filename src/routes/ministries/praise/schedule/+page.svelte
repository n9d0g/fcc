<script lang="ts">
	// imports
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton'
	import { Autocomplete } from '@skeletonlabs/skeleton'
	import { modalStore } from '@skeletonlabs/skeleton'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import DetailsTooltip from '$lib/components/ministries/praise/DetailsTooltip.svelte'
	import { updatedDataFiltered, praiseModalSettings, searchFilter } from '$lib/utils'
	import { praiseLeaderOptions, praiseFilterPopupSettings, breadcrumbs } from '$lib/constants'

	// server fetching
	import type { PageData } from './$types'
	import { fade } from 'svelte/transition'
	export let data: PageData

	let tHead: any = data.tableHeader
	let tBody: any = data.tableBody
	let schedTable: any

	// variables
	let leader = ''
	const upToDatePraiseData = updatedDataFiltered(data.praise, 'date')

	let popupSettings: PopupSettings = {
		event: 'hover',
		target: 'detailsToolTip',
		placement: 'top',
	}

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

	const onFilterSelection = (e) => {
		leader = e.detail.label
	}

	const breadcrumb = [breadcrumbs.home, breadcrumbs.ministries, breadcrumbs.praise, breadcrumbs.schedule]
</script>

<FccLayout {breadcrumb} title="FCC | Praise Schedule">
	<PageTitle text="Praise Schedule." />
	<label class="flex gap-4 label my-8 max-w-fit">
		<input
			class="autocomplete input w-64 max-w-fit"
			type="search"
			placeholder="Filter by leader"
			bind:value={leader}
			use:popup={praiseFilterPopupSettings}
		/>
		{#if leader.length > 0}
			<button
				transition:fade={{ duration: 150 }}
				on:click={() => (leader = '')}
				class="flex item-center variant-filled-error justify-center btn-icon w-[4rem] h-9"
			>
				Clear
			</button>
		{/if}
	</label>
	<div data-popup="praiseAutocomplete" class="z-30 bg-surface-100-800-token w-64 rounded-md text-left p-4">
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
	<div use:popup={popupSettings} bind:this={schedTable}>
		<div class="table-container h-[60vh] w-full">
			<table class="table table-hover table-compact">
				<thead>
					<tr class="sticky variant-filled-secondary top-0 z-10">
						{#each tHead as header}
							<th class="p-3 font-bold text-left table-cell-fit">{header}</th>
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
											<td class="sticky bg-surface-100-800-token left-0 pl-3 text-left table-cell-fit">
												{week[col]}
											</td>
										{:else}
											<td class="pl-3 text-left">{week[col]}</td>
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
</FccLayout>
