<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
	let gallery = $derived(data.gallery)
	let links = $derived(data.links)
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<!-- Welcome Section -->
	<div class="mb-8">
		<h2 class="h2 mb-4 font-bold">Welcome to Golden Girls!</h2>
		<p class="text-lg">
			Join our vibrant community of women as we gather together in faith,
			friendship, and fellowship. Our group provides a welcoming space where we
			can encourage one another, share wisdom, and grow deeper in our walk with
			the Lord through Bible study and prayer.
		</p>
	</div>

	<!-- Zoom Link CTA -->
	<div class="card dark:bg-surface-800 mb-8 bg-white p-5">
		<div class="flex flex-wrap items-center gap-4">
			<div class="flex items-center gap-3">
				<span
					class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					💻
				</span>
				<div>
					<p class="font-semibold">Zoom Meeting</p>
					<p class="text-sm opacity-70">
						Meeting ID: {links.zoom.meetingId} | Passcode: {links.zoom.passcode}
					</p>
				</div>
			</div>
			<a href={links.zoom.link} target="_blank" class="preset-filled btn">
				Join Zoom Meeting
			</a>
		</div>
	</div>

	<!-- Meeting Info Section -->
	<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="card dark:bg-surface-800 bg-white p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					📅
				</span>
				<h3 class="h4 font-bold">When We Meet</h3>
			</div>
			<div class="flex flex-col gap-1 opacity-80">
				<p class="font-semibold">TBD</p>
				<p>Online via Zoom</p>
			</div>
		</div>

		<div class="card dark:bg-surface-800 bg-white p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					📖
				</span>
				<h3 class="h4 font-bold">What We Study</h3>
			</div>
			<div class="flex flex-col gap-1 opacity-80">
				<p class="font-semibold">Bible Study & Discussion</p>
				<p>Growing together in God's Word</p>
			</div>
		</div>
	</div>

	<!-- How to Join -->
	<div class="card dark:bg-surface-800 mb-8 bg-white p-6">
		<h3 class="h3 mb-3 font-bold">How to Join</h3>
		<p class="mb-2">
			Whether you're new to Bible study or have been studying for years, you're
			welcome to join us! We'd love to have you be a part of our community.
		</p>
		<p>
			For more information, please reach out to Sister Ivy Metal or visit us on
			a Sunday service.
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
