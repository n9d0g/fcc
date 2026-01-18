<script lang="ts">
	import { format, addDays } from 'date-fns'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import { links } from '$lib/constants.js'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let tHeaders = $derived(data.tHeaders)
	let tBody = $derived(data.tBody)
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
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
							class="bg-gray-50 dark:bg-surface-800 max-lg:table-cell-fit sticky left-0 w-6 pl-3 text-left font-bold"
						>
							{format(addDays(new Date(month.date), 1), 'MMMM')}
						</td>
						<td
							class="max-lg:table-cell-fit w-6 pl-3 text-left whitespace-nowrap"
							>{month.presider}</td
						>
						<td
							class="max-lg:table-cell-fit w-6 pl-3 text-left whitespace-nowrap"
							>{month.invites}</td
						>
						<td
							class="max-lg:table-cell-fit w-6 pl-3 text-left whitespace-nowrap"
							>{month.openingPrayer}</td
						>
						<td
							class="max-lg:table-cell-fit w-6 pl-3 text-left whitespace-nowrap"
							>{month.closingPrayer}</td
						>
						<td
							class="max-lg:table-cell-fit w-6 pl-3 text-left whitespace-nowrap"
							>{month.powerpoint}</td
						>
						<td
							class="max-lg:table-cell-fit w-6 pl-3 text-left whitespace-nowrap"
							>{month.communionPresider}</td
						>
						<td
							class="max-lg:table-cell-fit w-6 pl-3 text-left whitespace-nowrap"
							>{month.coffeeBreakfast}</td
						>
						<td
							class="max-lg:table-cell-fit w-6 pl-3 text-left whitespace-nowrap"
							>{month.counters}</td
						>
						<td
							class="max-lg:table-cell-fit w-6 pl-3 text-left whitespace-nowrap"
							>{month.setupUshers}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</FccLayout>
