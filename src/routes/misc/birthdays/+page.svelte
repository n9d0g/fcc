<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'
	import { searchFilter } from '$lib/utils'

	// props
	export let data

	// variable
	const birthdays = data.data
	const months: any = data.months
	const tHead = ['Name', 'Date']
	let filterQuery = ''
	let bdayType: any
	let sortType: any
	let monthType: any
	let bdayTypeValue: number = 1
	let sortTypeValue: number = 1
	let monthTypeValue: number = 0
	let updateKey: number = 0

	const breadcrumb = [breadcrumbs.home, breadcrumbs.misc, breadcrumbs.misc.birthdays]

	const filterBirthdays = () => {
		let res = birthdays

		// bday type
		if (bdayTypeValue == 1) res = res.filter((bday: any) => bday.wa === false)
		else if (bdayTypeValue == 2) res = res.filter((bday: any) => bday.wa === true)

		// sort type
		if (sortTypeValue == 1)
			res = res.sort((a: any, b: any) => (a.birthday.slice(5, 10) > b.birthday.slice(5, 10) ? 1 : -1))
		else res = res.sort((a: any, b: any) => (a.name > b.name ? 1 : -1))

		// month type
		if (monthTypeValue !== 0) {
			// turn single digit month values into double digit
			let monthVal = ('0' + monthTypeValue).slice(-2)
			res = res.filter((bday: any) => bday.birthday.slice(5, 7).includes(monthVal))
		}

		return res
	}

	const handleFilterType = () => {
		bdayTypeValue = bdayType
		sortTypeValue = sortType
		monthTypeValue = monthType
		updateKey += 1
	}
</script>

<FccLayout {breadcrumb} headData={data.headData}>
	<PageTitle text="FCC Birthdays." />

	<div class="flex flex-col items-center justify-center gap-8">
		<div class="lg:2/3 mx-4 flex w-full flex-col gap-4 md:w-1/2">
			<div class="flex gap-6">
				<label class="label flex-1">
					<span>Type:</span>
					<select class="select" bind:value={bdayType} on:change={handleFilterType}>
						<option value="1">Birthdays</option>
						<option value="2">Wedding Anniversaries</option>
						<option value="3">All</option>
					</select>
				</label>
				<label class="label flex-1">
					<span>Sort:</span>
					<select class="select" bind:value={sortType} on:change={handleFilterType}>
						<option value="1">Date</option>
						<option value="2">Alphabetical</option>
					</select>
				</label>
				<label class="label flex-1">
					<span>Month:</span>
					<select class="select" bind:value={monthType} on:change={handleFilterType}>
						{#each months as month}
							<option value={month.value}>{month.name}</option>
						{/each}
					</select>
				</label>
			</div>
			<label class="label flex-1">
				<span>Filter by name:</span>
				<input class="input w-full" type="text" placeholder="Filter by name" bind:value={filterQuery} />
			</label>
		</div>

		{#key updateKey}
			<div class="lg:2/3 table-container mx-4 w-full md:w-1/2">
				<table class="table-hover table-compact table">
					<thead>
						<tr class="flex w-full justify-center">
							{#each tHead as header}
								<td class="flex-1 p-3">{header}</td>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each searchFilter(filterBirthdays(), 'name', filterQuery) as birthday}
							<tr class="flex">
								<td class="flex-1">
									{birthday.name}
									{#if birthday.wa}
										(WA)
									{/if}
								</td>
								<td class="flex-1">{birthday.birthday.slice(5, 10)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/key}
	</div>
</FccLayout>
