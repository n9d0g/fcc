<script lang="ts">
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton'
	import type { TableSource } from '@skeletonlabs/skeleton'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { dateToday, breadcrumbs } from '$lib/constants'

	// server fetching
	export let data

	// variables
	const pdfLink = data.data[0].pdf
	const schedule = data.data[0].schedule
	const upToDateSchedule = schedule
		.filter((item: any) => item.date >= dateToday)
		.sort((a: any, b: any) => (a.date > b.date ? 1 : -1))

	let table: TableSource = {
		head: ['Date', 'Week', 'Leader', 'Chapter'],
		body: tableMapperValues(upToDateSchedule, ['date', 'week', 'leader', 'chapter']),
	}

	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.smallgroups,
		breadcrumbs.smallgroups.ya,
		breadcrumbs.smallgroups.ya.men,
	]
</script>

<FccLayout {breadcrumb} headData={data.headData}>
	<PageTitle text="FCC Young Adults Men's Small Group." />
	<h2 class="h2">Current Book: Rest & War</h2>
	<a href={pdfLink} class="anchor btn variant-filled-tertiary my-8 w-fit">Rest & War PDF Download</a>
	<Table source={table} regionCell="justify-center" class="w-full md:w-3/4 xl:w-1/2" />
</FccLayout>
