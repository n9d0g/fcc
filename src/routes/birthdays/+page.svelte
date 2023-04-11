<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'
	import { searchFilter } from '$lib/utils'

	// props
	export let data

	// variable
	const birthdays = data.data
	const tHead = ['Name', 'Date']
	let filter = ''
	let bdayType: any
	let sortType: any
	let bdayTypeValue: number = 1
	let sortTypeValue: number = 1
	let updateKey: number = 0

	const breadcrumb = [breadcrumbs.home, breadcrumbs.birthdays]

	const filterBirthdays = (option: number) => {
		if (option == 1) return birthdays.filter((bday: any) => bday.wa === false)
		else if (option == 2) return birthdays.filter((bday: any) => bday.wa === true)
		else return birthdays
	}

	const sortBirthdays = (bdayObj: any) => {
		if (sortTypeValue == 1)
			return bdayObj.sort((a: any, b: any) => (a.birthday.slice(5, 10) > b.birthday.slice(5, 10) ? 1 : -1))
		else return bdayObj.sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
	}

	const handleBdayType = () => {
		bdayTypeValue = bdayType
		updateKey += 1
	}

	const handleSortType = () => {
		sortTypeValue = sortType
		updateKey += 1
	}
</script>

<FccLayout {breadcrumb} title="FCC | Birthdays">
	<PageTitle text="FCC Birthdays." />

	<div class="flex flex-col items-center justify-center gap-8">
		<div class="lg:2/3 mx-4 flex w-full flex-col gap-4 md:w-1/2">
			<div class="flex gap-6">
				<label class="label flex-1">
					<span>Type:</span>
					<select class="select" bind:value={bdayType} on:change={handleBdayType}>
						<option value="1">Birthdays</option>
						<option value="2">Wedding Anniversaries</option>
						<option value="3">All</option>
					</select>
				</label>
				<label class="label flex-1">
					<span>Sort:</span>
					<select class="select" bind:value={sortType} on:change={handleSortType}>
						<option value="1">Date</option>
						<option value="2">Alphabetical</option>
					</select>
				</label>
			</div>
			<label class="label">
				<span>Filter:</span>
				<input class="input w-full" type="text" placeholder="Filter by name" bind:value={filter} />
			</label>
		</div>

		{#key sortTypeValue}
			<div class="lg:2/3 table-container mx-4 w-full md:w-1/2">
				<table class="table-hover table-compact table">
					<thead>
						<tr>
							{#each tHead as header}
								<td>{header}</td>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each searchFilter(sortBirthdays(filterBirthdays(bdayTypeValue)), 'name', filter) as birthday}
							<tr>
								<td>
									{birthday.name}
									{#if birthday.wa}
										(WA)
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
