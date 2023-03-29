<script lang="ts">
	import FccLayout from '$lib/FccLayout.svelte'
	import PageTitle from '$lib/PageTitle.svelte'
	import type { PageData } from './$types'

	// props
	export let data: PageData

	// variable
	const birthdays = data.data
	const tHead = ['Name', 'Date']
	let filter = ''

	// functions
	const filteredBirthdays = () => {
		return birthdays.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
	}
</script>

<FccLayout title="FCC | Birthdays">
	<PageTitle text="FCC Birthdays." />

	<div class="flex flex-col justify-center items-center gap-8">
		<label class="label">
			<input class="input w-full" type="text" placeholder="Filter by name" bind:value={filter} />
		</label>

		{#key filter}
			<div class="table-container w-screen md:w-1/2 lg:2/3">
				<table class="table table-hover table-compact">
					<thead>
						<tr>
							{#each tHead as header}
								<td>{header}</td>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each filteredBirthdays() as birthday}
							<tr>
								<td>{birthday.name}</td>
								<td>{birthday.birthday}</td>
							</tr>
						{/each}
					</tbody>
					<tfoot>
						<tr>
							<th>Total:</th>
							<th>{filteredBirthdays().length}</th>
						</tr>
					</tfoot>
				</table>
			</div>
		{/key}
	</div>
</FccLayout>
