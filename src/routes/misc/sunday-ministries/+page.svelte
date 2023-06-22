<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'
	import { Temporal } from '@js-temporal/polyfill'

	export let data

	// variables
	let tHeaders: any = data.tableHeaders
	let tBody: any = data.tableBody

	const breadcrumb = [breadcrumbs.home, breadcrumbs.misc, breadcrumbs.misc.sundayMinistries]
</script>

<FccLayout {breadcrumb} headData={data.headData}>
	<PageTitle text="Sunday Ministries." />

	<!-- responsive container -->
	<div class="table-container relative">
		<!-- skeleton table -->
		<table class="relative table overflow-scroll">
			<thead>
				<tr class="variant-filled-secondary sticky top-0 z-10">
					{#each tHeaders as header, index}
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
			<tbody>
				{#each tBody as month}
					<tr>
						<td class="table-cell-fit sticky left-0 pl-3 text-left bg-surface-100-800-token">
							{Temporal.PlainYearMonth.from(month.date)}
						</td>
						<td class="whitespace-nowrap pl-3 text-left">{month.presider}</td>
						<td class="whitespace-nowrap pl-3 text-left">{month.invites}</td>
						<td class="whitespace-nowrap pl-3 text-left">{month.openingPrayer}</td>
						<td class="whitespace-nowrap pl-3 text-left">{month.closingPrayer}</td>
						<td class="whitespace-nowrap pl-3 text-left">{month.offeringUshers}</td>
						<td class="whitespace-nowrap pl-3 text-left">{month.powerpoint}</td>
						<td class="whitespace-nowrap pl-3 text-left">{month.crawlersToddlers}</td>
						<td class="whitespace-nowrap pl-3 text-left">{month.ssYoung}</td>
						<td class="whitespace-nowrap pl-3 text-left">{month.ssOld}</td>
						<td class="whitespace-nowrap pl-3 text-left">{month.communionPresider}</td>
						<td class="whitespace-nowrap pl-3 text-left">{month.coffeeBreakfast}</td>
						<td class="whitespace-nowrap pl-3 text-left">{month.counters}</td>
						<td class="whitespace-nowrap pl-3 text-left">{month.setupUshers}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</FccLayout>
