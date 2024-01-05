<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import { getMonth } from '$lib/utils.js'
	import { links } from '$lib/constants.js'
	import sundayMinistriesImg from '$lib/assets/fcc-2024-sunday-ministries.png'

	export let data
	const { tHeaders, tBody, title, breadcrumb, headData } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<!-- responsive container -->
	<div class="table-container relative">
		<!-- skeleton table -->
		<table class="relative table overflow-scroll">
			<thead>
				<tr class="variant-filled-secondary sticky top-0 z-10">
					{#each tHeaders as header, index}
						{#if index === 0}
							<th
								class="variant-filled-secondary table-cell-fit sticky left-0 z-30 p-3 text-left font-bold"
							>
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
					<tr class="text-center">
						<td
							class="bg-surface-200-700-token table-cell-fit sticky left-0 pl-3 text-left font-bold"
						>
							{getMonth(month.date)}
						</td>
						<td class="whitespace-nowrap pl-3 text-left">{month.presider}</td>
						<td class="whitespace-nowrap pl-3 text-left">{month.invites}</td>
						<td class="whitespace-nowrap pl-3 text-left"
							>{month.openingPrayer}</td
						>
						<td class="whitespace-nowrap pl-3 text-left"
							>{month.closingPrayer}</td
						>
						<td class="whitespace-nowrap pl-3 text-left">{month.powerpoint}</td>
						<td class="whitespace-nowrap pl-3 text-left"
							>{month.crawlersToddlers}</td
						>
						<td class="whitespace-nowrap pl-3 text-left">{month.ssYoung}</td>
						<td class="whitespace-nowrap pl-3 text-left">{month.ssOld}</td>
						<td class="whitespace-nowrap pl-3 text-left"
							>{month.communionPresider}</td
						>
						<td class="whitespace-nowrap pl-3 text-left"
							>{month.coffeeBreakfast}</td
						>
						<td class="whitespace-nowrap pl-3 text-left">{month.counters}</td>
						<td class="whitespace-nowrap pl-3 text-left">{month.setupUshers}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- image of ministries -->
	<div class="my-8 flex w-full flex-col justify-center gap-8">
		<img src={sundayMinistriesImg} alt="Sunday Ministries" />
		<div class="flex justify-center">
			<a href={links.excel} target="_blank" class="variant-filled btn">
				2024 Excel Data Sheet
			</a>
		</div>
	</div>
</FccLayout>
