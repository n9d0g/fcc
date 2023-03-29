<script lang="ts">
	import FccLayout from '$lib/FccLayout.svelte'
	import PageTitle from '$lib/PageTitle.svelte'
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton'
	import type { TableSource } from '@skeletonlabs/skeleton'

	// server fetching
	import type { PageData } from './$types'
	import { Temporal } from '@js-temporal/polyfill'
	export let data: PageData

	// variables
	const pdfLink = data.data[0].pdf
	const schedule = data.data[0].schedule
	const upToDateSchedule = schedule
		.filter((item) => item.date >= Temporal.Now.plainDateISO().toString())
		.sort((a, b) => (a.date > b.date ? 1 : -1))

	let table: TableSource = {
		head: ['Date', 'Week', 'Leader', 'Chapter'],
		body: tableMapperValues(upToDateSchedule, ['date', 'week', 'leader', 'chapter']),
	}

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'Small Groups', href: '/small-groups' },
		{ title: 'Young Adults', href: '/small-groups/young-adults' },
		{ title: 'Men', href: '/small-groups/young-adults/men' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | Young Adults - Men">
	<PageTitle text="FCC Young Adults Men's Small Group." />
	<h2>Current Book: Rest & War</h2>
	<a href={pdfLink} class="btn variant-filled-tertiary my-8 w-fit">Rest & War PDF Download</a>
	<Table source={table} regionCell="justify-center" class="max-w-[30rem]" />
</FccLayout>
