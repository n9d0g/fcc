<script lang="ts">
	import praiseData from '$lib/ministries/praise/praise.json'
	import { Table } from '@skeletonlabs/skeleton'
	import type { TableSource } from '@skeletonlabs/skeleton'
	import { tableMapperValues } from '@skeletonlabs/skeleton'
	import { Temporal } from '@js-temporal/polyfill'

	const upToDatePraiseData = () => {
		return praiseData.filter((item) => item.dateTemporal >= Temporal.Now.plainDateISO().toString())
	}

	const tableSimple: TableSource = {
		head: ['Date', 'Lead', 'Guitar', 'Keys', 'Bass', 'Drums', 'Backup', 'Sound/AV'],
		body: tableMapperValues(upToDatePraiseData(), [
			'date',
			'lead',
			'guitar',
			'keys',
			'bass',
			'drums',
			'backup',
			'av'
		])
	}
</script>

<svelte:head>
	<title>FCC | Praise Schedule</title>
</svelte:head>

<section class="container mx-auto flex flex-col justify-center">
	<h1 class="text-3xl font-bold py-36">praise schedule</h1>
	<Table source={tableSimple} interactive={true} />
</section>
