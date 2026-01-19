<script lang="ts">
	import { format, addDays } from 'date-fns'
	import FccLayout from '$lib/components/FccLayout.svelte'

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
	<div
		class="table-container dark:border-surface-600 relative overflow-x-auto rounded-lg border border-gray-200"
	>
		<table class="relative w-full text-sm">
			<thead>
				<tr
					class="bg-primary-600 dark:bg-primary-700 sticky top-0 z-10 text-white"
				>
					{#each tHeaders as header, index}
						{#if index === 0}
							<th
								class="bg-primary-600 dark:bg-primary-700 sticky left-0 z-30 min-w-[100px] px-4 py-3 text-left font-semibold"
							>
								{header}
							</th>
						{:else}
							<th class="min-w-[120px] px-4 py-3 text-left font-semibold">
								{header}
							</th>
						{/if}
					{/each}
				</tr>
			</thead>
			<tbody class="dark:divide-surface-600 divide-y divide-gray-200">
				{#each tBody as month, rowIndex}
					<tr
						class="transition-colors {rowIndex % 2 === 0
							? 'dark:bg-surface-800 bg-white'
							: 'dark:bg-surface-700 bg-gray-50'} dark:hover:bg-surface-600 hover:bg-gray-100"
					>
						<td
							class="sticky left-0 z-10 min-w-[100px] px-4 py-3 font-semibold {rowIndex %
								2 ===
							0
								? 'dark:bg-surface-800 bg-white'
								: 'dark:bg-surface-700 bg-gray-50'}"
						>
							{format(addDays(new Date(month.date), 1), 'MMMM')}
						</td>
						<td class="min-w-[120px] px-4 py-3 whitespace-nowrap"
							>{month.presider}</td
						>
						<td class="min-w-[120px] px-4 py-3 whitespace-nowrap"
							>{month.invites}</td
						>
						<td class="min-w-[120px] px-4 py-3 whitespace-nowrap"
							>{month.openingPrayer}</td
						>
						<td class="min-w-[120px] px-4 py-3 whitespace-nowrap"
							>{month.closingPrayer}</td
						>
						<td class="min-w-[120px] px-4 py-3 whitespace-nowrap"
							>{month.powerpoint}</td
						>
						<td class="min-w-[120px] px-4 py-3 whitespace-nowrap"
							>{month.communionPresider}</td
						>
						<td class="min-w-[120px] px-4 py-3 whitespace-nowrap"
							>{month.coffeeBreakfast}</td
						>
						<td class="min-w-[120px] px-4 py-3 whitespace-nowrap"
							>{month.hallSetup}</td
						>
						<td class="min-w-[120px] px-4 py-3 whitespace-nowrap"
							>{month.ushersGreeters}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</FccLayout>
