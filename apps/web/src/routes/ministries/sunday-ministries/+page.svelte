<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import { getMonth } from '$lib/utils.js'
	import { links } from '$lib/constants.js'

	export let data
	const { tHeaders, tBody, title, breadcrumb, headData } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<!-- responsive container -->
	<div class="table-container relative">
		<!-- skeleton table -->
		<table class="table relative overflow-scroll">
			<thead>
				<tr class="variant-filled-secondary sticky top-0 z-10">
					{#each tHeaders as header, index}
						{#if index === 0}
							<th
								class="variant-filled-secondary sticky left-0 z-30 w-6 p-3 text-left font-bold max-lg:table-cell-fit"
							>
								{header}
							</th>
						{:else}
							<th class="w-6 p-3 text-left font-bold max-lg:table-cell-fit"
								>{header}</th
							>
						{/if}
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each tBody as month}
					<tr class="text-center">
						<td
							class="bg-surface-200-700-token sticky left-0 w-6 pl-3 text-left font-bold max-lg:table-cell-fit"
						>
							{getMonth(month.date)}
						</td>
						<td
							class="w-6 whitespace-nowrap pl-3 text-left max-lg:table-cell-fit"
							>{month.presider}</td
						>
						<td
							class="w-6 whitespace-nowrap pl-3 text-left max-lg:table-cell-fit"
							>{month.invites}</td
						>
						<td
							class="w-6 whitespace-nowrap pl-3 text-left max-lg:table-cell-fit"
							>{month.openingPrayer}</td
						>
						<td
							class="w-6 whitespace-nowrap pl-3 text-left max-lg:table-cell-fit"
							>{month.closingPrayer}</td
						>
						<td
							class="w-6 whitespace-nowrap pl-3 text-left max-lg:table-cell-fit"
							>{month.powerpoint}</td
						>
						<td
							class="w-6 whitespace-nowrap pl-3 text-left max-lg:table-cell-fit"
							>{month.crawlersToddlers}</td
						>
						<td
							class="w-6 whitespace-nowrap pl-3 text-left max-lg:table-cell-fit"
							>{month.ssYoung}</td
						>
						<td
							class="w-6 whitespace-nowrap pl-3 text-left max-lg:table-cell-fit"
							>{month.ssOld}</td
						>
						<td
							class="w-6 whitespace-nowrap pl-3 text-left max-lg:table-cell-fit"
							>{month.communionPresider}</td
						>
						<td
							class="w-6 whitespace-nowrap pl-3 text-left max-lg:table-cell-fit"
							>{month.coffeeBreakfast}</td
						>
						<td
							class="w-6 whitespace-nowrap pl-3 text-left max-lg:table-cell-fit"
							>{month.counters}</td
						>
						<td
							class="w-6 whitespace-nowrap pl-3 text-left max-lg:table-cell-fit"
							>{month.setupUshers}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- image of ministries -->
	<div class="my-8 flex w-full flex-col justify-center gap-8">
		<div class="flex justify-center">
			<a href={links.excel} target="_blank" class="variant-filled btn">
				2024 Excel Data Sheet
			</a>
		</div>
	</div>
</FccLayout>
