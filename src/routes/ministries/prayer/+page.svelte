<script lang="ts">
	import { searchFilter } from '$lib/utils'
	import { fade } from 'svelte/transition'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import IoIosClose from 'svelte-icons/io/IoIosClose.svelte'

	// server fetching
	export let data

	const title = data.title
	const breadcrumb = data.breadcrumb
	const headData = data.headData
	const prayerData = data.data
	let filterQuery = ''
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<!-- copy -->
	<h2 class="h2 font-bold text-red-500">Please take note of the following:</h2>
	<ul class="my-2 list-outside list-disc pl-4">
		<li>FCC’s Bible Verse this year 2023 is: Acts 2:42.</li>
		<li>
			The text you’re assigned to prepare for should have the underpinnings of <span class="font-bold text-red-500">
				Acts 2:42
			</span> — “Koinonia” (Greek word) meaning holding something in common.
		</li>
	</ul>
	<blockquote class="blockquote my-4 border-l-4 border-primary-500">
		“And they devoted themselves to the apostles’ teaching and the fellowship, to the breaking of bread and the
		prayers.“
	</blockquote>
	<div class="my-4">
		<p class="font-bold">
			Koinonia — is the unity of the Spirit that comes from Christians shared belief, convictions, and behavior.
		</p>
		<p class="font-bold">
			Koinonia — is the mutual cooperation in God’s worship, God’s work, and God’s will being done in our midst.
		</p>
	</div>
	<p>For BS group coordinators, you can assign a member of your group to do the devotional (10-15 minutes).</p>
	<ul class="list-outside list-disc pl-4">
		<li>You will be provided a copy of the steps on how to prepare or do a devotional.</li>
		<li>
			Lastly, you will be provided a copy of an article on how to understand biblical koinonia to help you in your
			preparation.
		</li>
	</ul>

	<hr class="my-8" />

	<h2 class="h2 my-4 text-3xl font-bold">Prayer Meeting Schedule</h2>

	<!-- search schedule -->
	<label class="label relative mb-4 flex w-full flex-col gap-2 md:w-1/3">
		<span>Filter by name:</span>
		<input class="input" type="text" placeholder="Filter by name" bind:value={filterQuery} />
		{#if filterQuery.length > 0}
			<button
				transition:fade={{ duration: 150 }}
				on:click={() => (filterQuery = '')}
				class="absolute right-2 top-[39px] h-7 w-7 cursor-pointer rounded-xl"
			>
				<IoIosClose />
			</button>
		{/if}
	</label>

	<!-- schedule table -->
	<div class="table-container">
		<table class="table-hover table">
			<thead>
				<tr>
					<th>Date</th>
					<th>Name</th>
					<th>Scripture</th>
				</tr>
			</thead>
			<tbody>
				{#each searchFilter(prayerData, 'name', filterQuery) as row}
					<tr>
						<td>{row.date}</td>
						<td>{row.name}</td>
						<td>{row.scripture}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</FccLayout>
