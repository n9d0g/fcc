<script lang="ts">
	// imports
	import { Table } from '@skeletonlabs/skeleton'
	import type { TableSource } from '@skeletonlabs/skeleton'
	import { tableMapperValues } from '@skeletonlabs/skeleton'
	import { Temporal } from '@js-temporal/polyfill'
	import FccLayout from '$lib/FccLayout.svelte'
	import PageTitle from '$lib/PageTitle.svelte'
	import { Modal, modalStore } from '@skeletonlabs/skeleton'
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton'

	// server fetching
	import type { PageData } from './$types'
	export let data: PageData

	// variables
	let leader = ''
	const alert: ModalSettings = {
		type: 'alert',
		title: `Praise Week Modal WIP 🚧`,
		body: `WIP 🚧`
	}

	// functions
	const upToDatePraiseData = () => {
		return data.praise
			.filter((item) => item.date >= Temporal.Now.plainDateISO().toString())
			.sort((a, b) => (a.date > b.date ? 1 : -1))
	}
	const openDetails = (e) => {
		modalStore.trigger(alert)
	}
	const handleInputChange = () => {
		tableSimple = tableSimple
	}

	let tableSimple: TableSource = {
		head: data.tableHeader,
		body: tableMapperValues(upToDatePraiseData(), data.tableBody)
	}
</script>

<FccLayout title="FCC | Praise Schedule">
	<PageTitle text="Praise Schedule." />
	<label class="flex flex-col gap-4 label my-8">
		<input
			disabled
			class="input w-64"
			type="text"
			placeholder="Filter by leader - WIP 🚧"
			bind:value={leader}
			on:input={handleInputChange}
		/>
	</label>
	{#key leader}
		<Table source={tableSimple} interactive={true} on:selected={openDetails} class="rounded" />
	{/key}
	<Modal />
</FccLayout>
