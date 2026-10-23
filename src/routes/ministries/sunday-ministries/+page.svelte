<script lang="ts">
	import womenFellowship from '#lib/assets/community/women-fellowship.jpg'
	import { formatCmsDate } from '#lib/utils.js'
	import FccLayout from '#lib/components/FccLayout.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let tHeaders = $derived(data.tHeaders)
	let tBody = $derived(data.tBody)
</script>

<FccLayout
	heading="Sunday Ministries."
	image={womenFellowship}
	imageAlt="FCC members sharing a meal after service"
	imagePosition="center 40%"
	intro="FCC is volunteer-led: every Sunday service is run by members of our church family. Here's who is serving each month."
>
	<div class="table-container">
		<table class="table">
			<thead class="sticky-head">
				<tr>
					{#each tHeaders as header, index}
						<th class={index === 0 ? 'sticky-col min-w-28' : 'min-w-32'}>
							{header}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each tBody as month}
					<tr>
						<td class="sticky-col">{formatCmsDate(month.date, 'MMMM')}</td>
						<td class="whitespace-nowrap">{month.presider}</td>
						<td class="whitespace-nowrap">{month.invites}</td>
						<td class="whitespace-nowrap">{month.openingPrayer}</td>
						<td class="whitespace-nowrap">{month.closingPrayer}</td>
						<td class="whitespace-nowrap">{month.powerpoint}</td>
						<td class="whitespace-nowrap">{month.communionPresider}</td>
						<td class="whitespace-nowrap">{month.coffeeBreakfast}</td>
						<td class="whitespace-nowrap">{month.hallSetup}</td>
						<td class="whitespace-nowrap">{month.ushersGreeters}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</FccLayout>
