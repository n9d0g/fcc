<script lang="ts">
	import { format, addDays } from 'date-fns'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import { links } from '$lib/constants.js'

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
								class="variant-filled-secondary max-lg:table-cell-fit sticky left-0 z-30 w-6 p-3 text-left font-bold"
							>
								{header}
							</th>
						{:else}
							<th class="max-lg:table-cell-fit w-6 p-3 text-left font-bold">
								{header}
							</th>
						{/if}
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each tBody as month}
					<tr class="text-center">
						<td
							class="bg-surface-200-700-token max-lg:table-cell-fit sticky left-0 w-6 pl-3 text-left font-bold"
						>
							{format(addDays(new Date(month.date), 1), 'MMMM')}
						</td>
						<td
							class="max-lg:table-cell-fit w-6 whitespace-nowrap pl-3 text-left"
							>{month.presider}</td
						>
						<td
							class="max-lg:table-cell-fit w-6 whitespace-nowrap pl-3 text-left"
							>{month.invites}</td
						>
						<td
							class="max-lg:table-cell-fit w-6 whitespace-nowrap pl-3 text-left"
							>{month.openingPrayer}</td
						>
						<td
							class="max-lg:table-cell-fit w-6 whitespace-nowrap pl-3 text-left"
							>{month.closingPrayer}</td
						>
						<td
							class="max-lg:table-cell-fit w-6 whitespace-nowrap pl-3 text-left"
							>{month.powerpoint}</td
						>
						<td
							class="max-lg:table-cell-fit w-6 whitespace-nowrap pl-3 text-left"
							>{month.crawlersToddlers}</td
						>
						<td
							class="max-lg:table-cell-fit w-6 whitespace-nowrap pl-3 text-left"
							>{month.ssYoung}</td
						>
						<td
							class="max-lg:table-cell-fit w-6 whitespace-nowrap pl-3 text-left"
							>{month.ssOld}</td
						>
						<td
							class="max-lg:table-cell-fit w-6 whitespace-nowrap pl-3 text-left"
							>{month.communionPresider}</td
						>
						<td
							class="max-lg:table-cell-fit w-6 whitespace-nowrap pl-3 text-left"
							>{month.coffeeBreakfast}</td
						>
						<td
							class="max-lg:table-cell-fit w-6 whitespace-nowrap pl-3 text-left"
							>{month.counters}</td
						>
						<td
							class="max-lg:table-cell-fit w-6 whitespace-nowrap pl-3 text-left"
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
