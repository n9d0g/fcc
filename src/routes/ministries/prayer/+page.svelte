<script lang="ts">
	import bibleStudy from '#lib/assets/community/bible-study.jpg'
	import { searchFilter } from '#lib/utils.js'
	import { formatMeetingDate } from '#lib/schemas/prayer.js'
	import Icon from '@iconify/svelte'
	import FccLayout from '#lib/components/FccLayout.svelte'
	import MinistryPageContent from '#lib/components/ministries/MinistryPageContent.svelte'
	import FilterBy from '#lib/components/FilterBy.svelte'

	// Svelte 5 props
	let { data } = $props()
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

<FccLayout
	{title}
	{breadcrumb}
	{headData}
	image={bibleStudy}
	imageAlt="FCC members gathered for prayer and study"
	imagePosition="center 40%"
>
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
			<p class="eyebrow">Who's leading</p>
			<h2 class="h2 mt-3 mb-6">Prayer Meeting Schedule</h2>

			{#if data.mine.length}
				<p
					class="mb-6 flex items-start gap-3 rounded-2xl border border-secondary-200 bg-secondary-50 p-4"
					role="status"
				>
					<Icon icon="lucide:book-open" class="mt-0.5 size-5 shrink-0 text-secondary-700" />
					<span>
						You're leading the devotional on
						<strong>{data.mine.map((d) => formatMeetingDate(d, 'short')).join(', ')}</strong>.
						We'll email you a reminder two weeks before, one week before and on the day.
					</span>
				</p>
			{/if}

			<div class="mb-6">
				<FilterBy label="Filter by name" bind:bindVal={filterQuery} />
			</div>

			<!-- schedule table -->
			<div class="table-container">
				<table class="table">
					<thead>
						<tr>
							<th>Date</th>
							<th>Name</th>
							<th>Scripture</th>
						</tr>
					</thead>
					<tbody>
						{#each searchFilter(prayerData, 'leader_name', filterQuery) as row (row.id)}
							<tr>
								<td class="whitespace-nowrap">{formatMeetingDate(row.meeting_date, 'short')}</td>
								<td>{row.leader_name ?? 'TBA'}</td>
								<td>{row.scripture ?? ''}</td>
							</tr>
						{:else}
							<tr>
								<td colspan="3" class="text-muted">No upcoming meetings scheduled yet.</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/snippet}
	</MinistryPageContent>
</FccLayout>
