<script lang="ts">
	import praiseData from '$lib/ministries/praise/praise.json'
	import { Table } from '@skeletonlabs/skeleton'
	import type { TableSource } from '@skeletonlabs/skeleton'
	import { tableMapperValues } from '@skeletonlabs/skeleton'
	import { Temporal } from '@js-temporal/polyfill'
	import FccLayout from '$lib/FccLayout.svelte'
	import PageTitle from '$lib/PageTitle.svelte'

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

<FccLayout title="FCC | Praise Schedule">
	<PageTitle text="Praise Schedule." />
	<Table source={tableSimple} interactive={true} />
</FccLayout>
