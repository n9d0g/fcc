<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton'
	import type { TableSource } from '@skeletonlabs/skeleton'
	import { tableMapperValues } from '@skeletonlabs/skeleton'
	import { Temporal } from '@js-temporal/polyfill'
	import FccLayout from '$lib/FccLayout.svelte'
	import PageTitle from '$lib/PageTitle.svelte'
	import { Modal, modalStore } from '@skeletonlabs/skeleton'

	import type { PageData } from './$types'
	export let data: PageData

	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton'

	let leader = ''

	const upToDatePraiseData = () => {
		return data.schedule.filter(
			(item) => item.dateTemporal >= Temporal.Now.plainDateISO().toString()
		)
	}

	let tableSimple: TableSource = {
		head: data.tableHeader,
		body: tableMapperValues(upToDatePraiseData(), data.tableBody)
	}

	const alert: ModalSettings = {
		type: 'alert',
		title: 'Schedule Modal',
		body: 'Schedule Modal Test'
	}

	const openDetails = () => {
		modalStore.trigger(alert)
	}

	const handleInputChange = () => {
		console.log(
			data.schedule.filter((item) => item.lead.toLowerCase().includes(leader.toLowerCase()))
		)
		tableSimple = tableSimple
	}
</script>

<FccLayout title="FCC | Praise Schedule">
	<PageTitle text="Praise Schedule." />
	<label class="flex flex-col gap-4 label my-8">
		<input
			disabled
			class="input w-64"
			type="text"
			placeholder="Filter by leader - WIP"
			bind:value={leader}
			on:input={handleInputChange}
		/>
	</label>
	{#key leader}
		<Table source={tableSimple} interactive={true} on:selected={openDetails} class="rounded" />
	{/key}
	<Modal />
</FccLayout>
