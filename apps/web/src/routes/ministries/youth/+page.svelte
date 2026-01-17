<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
	let gallery = $derived(data.gallery)
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<!-- Welcome Section -->
	<div class="mb-10">
		<h2 class="h2 mb-4 font-bold">Welcome to Our Youth Ministry!</h2>
		<p class="mb-4 text-lg">
			At Freedom in Christ Church, we believe in investing in the vibrant and
			dynamic potential of our youth. Our Youth Ministry provides a space where
			teenagers aged 13-19 can gather, connect, and grow in their faith. Join us
			each month for an exciting blend of spiritual development, community
			engagement, and lots of fun!
		</p>
		<div class="flex items-center gap-3">
			<span class="text-primary-400 text-2xl">●</span>
			<div>
				<p class="font-semibold">Ages 13-19</p>
				<p class="text-sm opacity-70">Teenagers welcome!</p>
			</div>
		</div>
	</div>

	<!-- Mission & Vision Cards -->
	<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="card preset-tonal-surface p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					🎯
				</span>
				<h3 class="h4 font-bold">Mission</h3>
			</div>
			<p class="opacity-80">
				Our mission is to empower the youth to develop a strong and authentic
				relationship with God, fostering a community where they feel valued,
				supported, and inspired to live out their faith. Through our regular
				gatherings, we aim to equip teenagers with the tools they need to
				navigate life's challenges with confidence and grace.
			</p>
		</div>

		<div class="card preset-tonal-surface p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					👁️
				</span>
				<h3 class="h4 font-bold">Vision</h3>
			</div>
			<p class="opacity-80">
				We envision a Youth Ministry that not only nurtures spiritual growth but
				also encourages active participation in church and community life. Our
				goal is to see young people confidently living out their faith,
				impacting their peers and the world around them.
			</p>
		</div>
	</div>

	<!-- What to Expect -->
	<div class="mb-8">
		<h3 class="h3 mb-4 font-bold">What to Expect</h3>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			<div class="card preset-tonal-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						📖
					</span>
					<h4 class="h4 font-bold">Bible Studies</h4>
				</div>
				<p class="opacity-80">
					Regular and engaging Bible studies tailored to the unique needs and
					questions of teenagers.
				</p>
			</div>

			<div class="card preset-tonal-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						🌍
					</span>
					<h4 class="h4 font-bold">Community Involvement</h4>
				</div>
				<p class="opacity-80">
					Opportunities to participate in service projects, outreach events, and
					make a positive impact in the community.
				</p>
			</div>

			<div class="card preset-tonal-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						⛪
					</span>
					<h4 class="h4 font-bold">Church Engagement</h4>
				</div>
				<p class="opacity-80">
					Involvement in various church activities, events, and worship services
					designed to integrate youth into the broader church community.
				</p>
			</div>

			<div class="card preset-tonal-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						🤝
					</span>
					<h4 class="h4 font-bold">Fellowship</h4>
				</div>
				<p class="opacity-80">
					Building friendships with other teens who share similar values and
					beliefs.
				</p>
			</div>

			<div class="card preset-tonal-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						🎉
					</span>
					<h4 class="h4 font-bold">Fun Activities</h4>
				</div>
				<p class="opacity-80">
					Exciting and enjoyable activities that make our gatherings memorable
					and create a sense of camaraderie.
				</p>
			</div>
		</div>
	</div>

	<!-- How to Join -->
	<div class="card preset-tonal-secondary mb-8 p-6">
		<h3 class="h3 mb-3 font-bold">How to Join</h3>
		<p class="mb-2">
			Whether you're a regular attendee or a newcomer, your presence is eagerly
			anticipated, and we look forward to welcoming you. Contact Sis
			<a href="https://www.facebook.com/raquel.quiambao.1" class="anchor"
				>Raquel Quiambao</a
			> for more details.
		</p>
		<p>
			Come and be a part of a community where the energy and passion of youth
			are celebrated, and where faith becomes a vibrant and transformative
			journey. Join us at our next Youth Ministry for an inspiring time of
			growth, connection, and fun.
		</p>
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
