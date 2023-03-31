<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { searchFilter } from '$lib/utils'
	import type { PageData } from './$types'

	// props
	export let data: PageData

	// variable
	const birthdays = data.data
	const tHead = ['Name', 'Date']
	let filter = ''
	let selected: any

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'Birthdays', href: '/birthdays' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | Birthdays">
	<PageTitle text="FCC Birthdays." />

	<div class="flex flex-col justify-center items-center gap-8">
		<div class="flex flex-col w-full mx-4 md:w-1/2 lg:2/3 gap-4">
			<select class="select" bind:value={selected} disabled>
				<option value="1" selected>Birthdays</option>
				<option value="2">Wedding Anniversaries</option>
			</select>
			<label class="label">
				<input class="input w-full" type="text" placeholder="Filter by name" bind:value={filter} />
			</label>
		</div>

		{#key filter}
			<div class="table-container w-full mx-4 md:w-1/2 lg:2/3">
				<table class="table table-hover table-compact">
					<thead>
						<tr>
							{#each tHead as header}
								<td>{header}</td>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each searchFilter(birthdays, 'name', filter) as birthday}
							<tr>
								<td>
									{birthday.name}
									{#if birthday.wa}
										(Wedding Annviversary)
									{/if}
								</td>
								<td>{birthday.birthday.slice(5, 10)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/key}
	</div>
</FccLayout>
