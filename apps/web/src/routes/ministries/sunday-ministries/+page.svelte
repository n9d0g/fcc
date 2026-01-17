<script lang="ts">
	import { format, addDays } from 'date-fns'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import { links } from '$lib/constants.js'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	const { tHeaders, tBody, title, breadcrumb, headData } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<!-- responsive container -->
	<div class="table-container relative">
		<!-- skeleton table -->
		<table class="relative table overflow-scroll">
			<thead>
				<tr class="preset-filled-secondary-500 sticky top-0 z-10">
					{#each tHeaders as header, index}
						{#if index === 0}
							<th
								class="preset-filled-secondary-500 max-lg:table-cell-fit sticky left-0 z-30 w-6 p-3 text-left font-bold"
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
</FccLayout>
