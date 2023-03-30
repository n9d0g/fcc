<script lang="ts">
	// imports
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { modalStore } from '@skeletonlabs/skeleton'
	import { updatedDataFiltered, praiseModalSettings, searchFilter } from '$lib/utils'

	// server fetching
	import type { PageData } from './$types'
	export let data: PageData

	let tHead: any = data.tableHeader
	let tBody: any = data.tableBody

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
			title: e.title,
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

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'Ministries', href: '/ministries' },
		{ title: 'Praise & Worship', href: '/ministries/praise' },
		{ title: 'Schedule', href: '/ministries/praise/schedule' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | Praise Schedule">
	<PageTitle text="Praise Schedule." />
	<label class="flex flex-col gap-4 label my-8">
		<input class="input w-64" type="text" placeholder="Filter by leader" bind:value={leader} />
	</label>
	<span
		class="text-xs text-center card variant-filled-primary p-2 whitespace-nowrap shadow-xl"
		data-popup="detailsToolTip"
	>
		<span class="arrow variant-filled-primary" />
		Click on a row to view details 🔎
	</span>
	<!-- mobile tip -->
	<span
		class="flex lg:hidden text-xs text-center variant-filled-primary w-fit p-2 whitespace-nowrap shadow-xl rounded-xl my-2 mx-auto"
	>
		Click on a row to view details 🔎
	</span>
	<div use:popup={popupSettings}>
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
											<td
												class="sticky bg-surface-100-800-token left-0 pl-3 text-left table-cell-fit"
											>
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
