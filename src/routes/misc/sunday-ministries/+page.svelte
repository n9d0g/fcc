<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	export let data

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
					{#each data.tableHeaders as header, index}
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
		</table>
	</div>
</FccLayout>
