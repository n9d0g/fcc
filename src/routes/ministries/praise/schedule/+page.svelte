<script lang="ts">
	// imports
	import { popup, Table, type PopupSettings } from '@skeletonlabs/skeleton'
	import type { TableSource } from '@skeletonlabs/skeleton'
	import { tableMapperValues } from '@skeletonlabs/skeleton'
	import { Temporal } from '@js-temporal/polyfill'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { Modal, modalStore } from '@skeletonlabs/skeleton'
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton'
	import PraiseModal from '$lib/components/ministries/praise/PraiseModal.svelte'

	// server fetching
	import type { PageData } from './$types'
	export let data: PageData

	// variables
	let leader = ''

	const modalComponentRegistry: Record<string, ModalComponent> = {
		modalComponentOne: {
			ref: PraiseModal,
		},
	}

	let popupSettings: PopupSettings = {
		event: 'hover',
		target: 'detailsToolTip',
		placement: 'top',
	}

	// functions
	const upToDatePraiseData = () => {
		return data.praise
			.filter((item) => item.date >= Temporal.Now.plainDateISO().toString())
			.sort((a, b) => (a.date > b.date ? 1 : -1))
	}

	const openDetails = (e: any) => {
		const alert: ModalSettings = {
			type: 'component',
			component: 'modalComponentOne',
			meta: { ...e.detail },
		}

		modalStore.trigger(alert)
	}

	const handleInputChange = () => {
		tableSimple = tableSimple
	}

	let tableSimple: TableSource = {
		head: data.tableHeader,
		body: tableMapperValues(upToDatePraiseData(), data.tableBody),
		meta: tableMapperValues(upToDatePraiseData(), data.tableMeta),
	}

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'Ministries', href: '/ministries' },
		{ title: 'Praise & Worship', href: '/ministries/praise' },
		{ title: 'Schedule', href: '/ministries/praise/schedule' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | Praise Schedule">
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
	<span
		class="text-xs text-center card variant-filled-primary p-2 whitespace-nowrap shadow-xl"
		data-popup="detailsToolTip"
	>
		<span class="arrow variant-filled-primary" />
		Click on a row to view details 🔎
	</span>
	<!-- mobile tip -->
	<span
		class="flex lg:hidden text-xs text-center variant-filled-primary w-fit p-2 whitespace-nowrap shadow-xl rounded-xl my-2 mx-auto"
	>
		Click on a row to view details 🔎
	</span>
	<div use:popup={popupSettings}>
		{#key leader}
			<Table
				source={tableSimple}
				interactive={true}
				on:selected={openDetails}
				regionHead="sticky top-0"
				class="h-[60vh]"
			/>
		{/key}
	</div>
	<Modal components={modalComponentRegistry} />
</FccLayout>
