<script lang="ts">
	import { format, addDays } from 'date-fns'
	import { searchFilter } from '$lib/utils'
	import { fade } from 'svelte/transition'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import MinistryPageContent from '$lib/components/ministries/MinistryPageContent.svelte'
	import Icon from '@iconify/svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
	let prayerData = $derived(data.prayerData)
	let gallery = $derived(data.gallery)
	let filterQuery = $state('')

	const expectations = [
		{
			emoji: '📖',
			title: 'Devotional Time',
			description:
				"Starting with a short devotional to center our hearts on God's Word before we pray.",
		},
		{
			emoji: '🌍',
			title: 'Global Intercession',
			description: 'Praying for the pressing needs of the world and current events.',
		},
		{
			emoji: '🍁',
			title: 'National Focus',
			description: 'Lifting up Canada in prayer for its well-being and prosperity.',
		},
		{
			emoji: '✈️',
			title: 'Missions Support',
			description:
				'Interceding for missions around the world and supporting the spread of the Gospel.',
		},
		{
			emoji: '⛪',
			title: 'Church Community',
			description:
				'Praying for the growth, unity, and spiritual health of our church family.',
		},
		{
			emoji: '🙏',
			title: 'Personal Requests',
			description: 'Creating a space to share and pray for individual needs.',
		},
	]
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<MinistryPageContent
		welcomeTitle="Welcome to Our Weekly Prayer Meeting!"
		welcomeDescription="At Freedom in Christ Church, we believe in the transformative power of prayer and the strength that comes from a community united in seeking God's guidance, mercy, and blessing. Our Weekly Prayer Meeting is a sacred space where we gather to lift our voices in intercession, express gratitude, and draw near to the heart of God."
		highlight={{ label: 'Every Wednesday at 7 PM', sublabel: 'Via Zoom' }}
		mission="Our mission is to create a dynamic and fervent community of prayer warriors who are committed to seeking God's will for the world, our nation, our church, and individual lives. Through our collective prayers, we aim to impact not only our immediate community but also extend God's love and grace to the broader global context."
		vision="We envision a prayerful congregation, passionately engaging with God through weekly gatherings, where hearts are stirred, burdens are shared, and lives are transformed. Our vision is to be a community that fervently intercedes for the world's needs, stands in the gap for current events, and supports one another in our personal journeys of faith."
		{expectations}
		{gallery}
	>
		{#snippet howToJoinContent()}
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
		{/snippet}

		{#snippet customContent()}
			<hr class="mb-8" />

			<h2 class="h2 my-4 text-3xl font-bold">Prayer Meeting Schedule</h2>

			<!-- search schedule -->
			<label class="label relative mb-4 flex w-full flex-col gap-2 md:w-1/3">
				<span>Filter by name:</span>
				<input
					class="input border p-2"
					type="text"
					placeholder="Filter by name"
					bind:value={filterQuery}
				/>
				{#if filterQuery.length > 0}
					<button
						transition:fade={{ duration: 150 }}
						onclick={() => (filterQuery = '')}
						class="absolute top-[39px] right-2 h-7 w-7 cursor-pointer rounded-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
					>
						<Icon icon="lucide:x" class="h-full w-full" />
					</button>
				{/if}
			</label>

			<!-- schedule table -->
			<div class="table-container mb-8">
				<table class="table">
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
								<td>{format(addDays(new Date(row.date), 1), 'MMMM do')}</td>
								<td>{row.name}</td>
								<td>{row.scripture}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/snippet}
	</MinistryPageContent>
</FccLayout>
