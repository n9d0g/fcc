<script lang="ts">
	import { searchFilter, getMonthDay } from '$lib/utils'
	import { fade } from 'svelte/transition'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import IoIosClose from 'svelte-icons/io/IoIosClose.svelte'

	// server fetching
	export let data
	const { title, breadcrumb, headData, prayerData } = data
	let filterQuery = ''
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<!-- copy -->
	<h2 class="h2 mb-2 font-bold">Welcome to Our Weekly Prayer Meeting!</h2>
	<p class="mb-4">
		At Freedom in Christ Church, we believe in the transformative power of
		prayer and the strength that comes from a community united in seeking God's
		guidance, mercy, and blessing. Our Weekly Prayer Meeting is a sacred space
		where we gather to lift our voices in intercession, express gratitude, and
		draw near to the heart of God. Join us every Wednesday at 7 PM via Zoom for
		a time of meaningful connection and powerful prayer.
	</p>

	<div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
		<div>
			<h3 class="h3 font-bold">Mission:</h3>
			<p>
				Our mission is to create a dynamic and fervent community of prayer
				warriors who are committed to seeking God's will for the world, our
				nation, our church, and individual lives. Through our collective
				prayers, we aim to impact not only our immediate community but also
				extend God's love and grace to the broader global context.
			</p>
		</div>

		<div>
			<h3 class="h3 font-bold">Vision:</h3>
			<p>
				We envision a prayerful congregation, passionately engaging with God
				through weekly gatherings, where hearts are stirred, burdens are shared,
				and lives are transformed. Our vision is to be a community that
				fervently intercedes for the world's needs, stands in the gap for
				current events, and supports one another in our personal journeys of
				faith.
			</p>
		</div>

		<div>
			<h3 class="h3 font-bold">Join Us Every Wednesday at 7 PM (via Zoom):</h3>
			<p>
				We invite you to be a part of our Weekly Prayer Meeting, held every
				Wednesday at 7 PM via Zoom. It's an opportunity to join your faith with
				others as we pray for the world, our beloved Canada, missions across the
				globe, our church family, and our individual prayer requests.
			</p>
		</div>

		<div>
			<h3 class="h3 font-bold">What to Expect:</h3>
			<ul class="list-outside list-disc pl-4">
				<li>
					<span class="font-bold">Devotional Time:</span>
					Starting with a short devotional to center our hearts on God's Word before
					we pray.
				</li>
				<li>
					<span class="font-bold">Global Intercession:</span>
					Praying for the pressing needs of the world and current events.
				</li>
				<li>
					<span class="font-bold">National Focus:</span>
					Lifting up Canada in prayer for its well-being and prosperity.
				</li>
				<li>
					<span class="font-bold">Missions Support:</span>
					Interceding for missions around the world and supporting the spread of
					the Gospel.
				</li>
				<li>
					<span class="font-bold">Church Community:</span>
					Praying for the growth, unity, and spiritual health of our church family.
				</li>
				<li>
					<span class="font-bold">Personal Prayer Requests:</span>
					Creating a space to share and pray for individual needs.
				</li>
			</ul>
		</div>
	</div>

	<div>
		<h3 class="h3 font-bold">How to Join:</h3>
		<p class="mb-2">
			To join our Weekly Prayer Meeting on Zoom, simply click the provided link
			at 7 PM every Wednesday. If you have specific prayer requests or topics
			you'd like us to pray for, feel free to share them during the meeting.
			Your presence and prayers are a valuable addition to our community.
		</p>
		<p>
			Come be a part of this transformative time of seeking God's face, sharing
			burdens, and lifting one another up in prayer. We look forward to
			connecting with you every Wednesday at 7 PM.
		</p>
	</div>

	<hr class="my-8" />

	<h2 class="h2 my-4 text-3xl font-bold">Prayer Meeting Schedule</h2>

	<!-- search schedule -->
	<label class="label relative mb-4 flex w-full flex-col gap-2 md:w-1/3">
		<span>Filter by name:</span>
		<input
			class="input"
			type="text"
			placeholder="Filter by name"
			bind:value={filterQuery}
		/>
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
		<table class="table table-hover">
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
						<td>{getMonthDay(row.date)}</td>
						<td>{row.name}</td>
						<td>{row.scripture}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</FccLayout>
