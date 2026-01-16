<script lang="ts">
	import { format, addDays } from 'date-fns'
	import { searchFilter } from '$lib/utils'
	import { fade } from 'svelte/transition'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import IoIosClose from 'svelte-icons/io/IoIosClose.svelte'

	// server fetching
	export let data
	const { title, breadcrumb, headData, prayerData, gallery } = data
	let filterQuery = ''
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<!-- Welcome Section -->
	<div class="mb-10">
		<h2 class="h2 mb-4 font-bold">Welcome to Our Weekly Prayer Meeting!</h2>
		<p class="mb-4 text-lg">
			At Freedom in Christ Church, we believe in the transformative power of
			prayer and the strength that comes from a community united in seeking
			God's guidance, mercy, and blessing. Our Weekly Prayer Meeting is a sacred
			space where we gather to lift our voices in intercession, express
			gratitude, and draw near to the heart of God.
		</p>
		<div class="flex items-center gap-3">
			<span class="text-primary-400 text-2xl">●</span>
			<div>
				<p class="font-semibold">Every Wednesday at 7 PM</p>
				<p class="text-sm opacity-70">Via Zoom</p>
			</div>
		</div>
	</div>

	<!-- Mission & Vision Cards -->
	<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="card variant-ghost-surface p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="variant-filled-primary flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					🎯
				</span>
				<h3 class="h4 font-bold">Mission</h3>
			</div>
			<p class="opacity-80">
				Our mission is to create a dynamic and fervent community of prayer
				warriors who are committed to seeking God's will for the world, our
				nation, our church, and individual lives. Through our collective
				prayers, we aim to impact not only our immediate community but also
				extend God's love and grace to the broader global context.
			</p>
		</div>

		<div class="card variant-ghost-surface p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="variant-filled-primary flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					👁️
				</span>
				<h3 class="h4 font-bold">Vision</h3>
			</div>
			<p class="opacity-80">
				We envision a prayerful congregation, passionately engaging with God
				through weekly gatherings, where hearts are stirred, burdens are shared,
				and lives are transformed. Our vision is to be a community that
				fervently intercedes for the world's needs, stands in the gap for
				current events, and supports one another in our personal journeys of
				faith.
			</p>
		</div>
	</div>

	<!-- What to Expect -->
	<div class="mb-8">
		<h3 class="h3 mb-4 font-bold">What to Expect</h3>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			<div class="card variant-ghost-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="variant-filled-primary flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						📖
					</span>
					<h4 class="h4 font-bold">Devotional Time</h4>
				</div>
				<p class="opacity-80">
					Starting with a short devotional to center our hearts on God's Word
					before we pray.
				</p>
			</div>

			<div class="card variant-ghost-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="variant-filled-primary flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						🌍
					</span>
					<h4 class="h4 font-bold">Global Intercession</h4>
				</div>
				<p class="opacity-80">
					Praying for the pressing needs of the world and current events.
				</p>
			</div>

			<div class="card variant-ghost-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="variant-filled-primary flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						🍁
					</span>
					<h4 class="h4 font-bold">National Focus</h4>
				</div>
				<p class="opacity-80">
					Lifting up Canada in prayer for its well-being and prosperity.
				</p>
			</div>

			<div class="card variant-ghost-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="variant-filled-primary flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						✈️
					</span>
					<h4 class="h4 font-bold">Missions Support</h4>
				</div>
				<p class="opacity-80">
					Interceding for missions around the world and supporting the spread of
					the Gospel.
				</p>
			</div>

			<div class="card variant-ghost-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="variant-filled-primary flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						⛪
					</span>
					<h4 class="h4 font-bold">Church Community</h4>
				</div>
				<p class="opacity-80">
					Praying for the growth, unity, and spiritual health of our church
					family.
				</p>
			</div>

			<div class="card variant-ghost-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="variant-filled-primary flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						🙏
					</span>
					<h4 class="h4 font-bold">Personal Requests</h4>
				</div>
				<p class="opacity-80">
					Creating a space to share and pray for individual needs.
				</p>
			</div>
		</div>
	</div>

	<!-- How to Join -->
	<div class="card variant-soft-secondary mb-8 p-6">
		<h3 class="h3 mb-3 font-bold">How to Join</h3>
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

	<hr class="mb-8" />

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
	<div class="table-container mb-8">
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
						<td>{format(addDays(new Date(row.date), 1), 'MMMM do')}</td>
						<td>{row.name}</td>
						<td>{row.scripture}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- Photo Gallery -->
	{#if gallery?.photos && gallery.photos.length > 0}
		<div>
			<h3 class="h3 mb-4 font-bold">Photo Gallery</h3>
			<div
				class="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
			>
				{#each gallery.photos as photo, index}
					<div
						class="overflow-hidden rounded-lg {index === 0
							? 'col-span-2 row-span-2'
							: index === 3
								? 'col-span-2'
								: index === 6
									? 'row-span-2'
									: ''}"
					>
						<img
							src={photo.url}
							alt={photo.alt || 'Gallery photo'}
							class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
						/>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</FccLayout>
