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
		<h2 class="h2 mb-4 font-bold">Welcome to our Young Adults Community!</h2>
		<p class="mb-4 text-lg">
			At Freedom in Christ Church, we recognize the unique journey and
			aspirations of young adults aged 20-35. Our Young Adults Community is a
			place where individuals in this age group can connect, grow spiritually,
			and navigate life's challenges together. Join us regularly for engaging
			gatherings that blend faith, community involvement, and meaningful
			connections.
		</p>
		<div class="flex items-center gap-3">
			<span class="text-primary-400 text-2xl">●</span>
			<div>
				<p class="font-semibold">Ages 20-35</p>
				<p class="text-sm opacity-70">Young adults welcome!</p>
			</div>
		</div>
	</div>

	<!-- Mission & Vision Cards -->
	<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="card dark:bg-surface-800 bg-white p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					🎯
				</span>
				<h3 class="h4 font-bold">Mission</h3>
			</div>
			<p class="opacity-80">
				Our mission is to create a supportive and vibrant community for young
				adults, equipping them to thrive spiritually, build authentic
				relationships, and make a positive impact in both the church and the
				broader community. Through our regular meetings, we aim to address the
				unique needs and questions that arise during this pivotal stage of life.
			</p>
		</div>

		<div class="card dark:bg-surface-800 bg-white p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					👁️
				</span>
				<h3 class="h4 font-bold">Vision</h3>
			</div>
			<p class="opacity-80">
				We envision a Young Adults Ministry where individuals are empowered to
				live out their faith with relevance and purpose. Our vision includes a
				community that actively engages in church life, fosters spiritual
				growth, and embraces opportunities to contribute positively to the world
				around them.
			</p>
		</div>
	</div>

	<!-- What to Expect -->
	<div class="mb-8">
		<h3 class="h3 mb-4 font-bold">What to Expect</h3>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			<div class="card dark:bg-surface-800 bg-white p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						📖
					</span>
					<h4 class="h4 font-bold">Bible Studies</h4>
				</div>
				<p class="opacity-80">
					Thought-provoking studies and discussions on relevant topics that
					resonate with the challenges and opportunities young adults face.
				</p>
			</div>

			<div class="card dark:bg-surface-800 bg-white p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						🌍
					</span>
					<h4 class="h4 font-bold">Community Involvement</h4>
				</div>
				<p class="opacity-80">
					Opportunities to participate in service projects, outreach
					initiatives, and activities that make a positive impact.
				</p>
			</div>

			<div class="card dark:bg-surface-800 bg-white p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						⛪
					</span>
					<h4 class="h4 font-bold">Church Engagement</h4>
				</div>
				<p class="opacity-80">
					Integration into various church activities, worship services, and
					events designed to connect young adults with the broader church
					family.
				</p>
			</div>

			<div class="card dark:bg-surface-800 bg-white p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						🤝
					</span>
					<h4 class="h4 font-bold">Fellowship</h4>
				</div>
				<p class="opacity-80">
					Building meaningful connections and friendships with other young
					adults who share similar values and aspirations.
				</p>
			</div>

			<div class="card dark:bg-surface-800 bg-white p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						💼
					</span>
					<h4 class="h4 font-bold">Life Transitions Support</h4>
				</div>
				<p class="opacity-80">
					Navigating the complexities of career and life transitions with the
					support of a community facing similar challenges.
				</p>
			</div>
		</div>
	</div>

	<!-- How to Join -->
	<div class="card dark:bg-surface-800 mb-8 bg-white p-6">
		<h3 class="h3 mb-3 font-bold">How to Join</h3>
		<p class="mb-2">
			To be part of our Young Adults Community, check the church calendar or
			announcements for the specific date and time of our regular gatherings.
			Whether you're a consistent participant or considering joining for the
			first time, your presence is valued, and we look forward to welcoming you.
			Contact sis
			<a href="https://www.facebook.com/lardinore" class="anchor">Noreen</a> for
			more details.
		</p>
		<p>
			Come and be a part of a community where the energy, questions, and dreams
			of young adulthood are celebrated. Join us at our next gathering for a
			time of meaningful connection, spiritual exploration, and the support you
			need on your journey.
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
