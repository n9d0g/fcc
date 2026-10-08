<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import Icon from '@iconify/svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
	let gallery = $derived(data.gallery)
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<!-- Welcome Section -->
	<div class="mb-8">
		<h2 class="h2 mb-4 font-bold">Welcome to the Young Adults Small Group!</h2>
		<p class="text-lg">
			Join us for fellowship, prayer, and Bible study as we navigate life's
			journey together. Our Young Adults Small Group provides a welcoming
			environment for those in their 20s and 30s to connect, grow in faith, and
			build meaningful relationships.
		</p>
	</div>

	<!-- Connect With Us CTA -->
	<div class="card dark:bg-surface-800 mb-8 bg-white p-5">
		<div class="flex flex-wrap items-center gap-4">
			<div class="flex items-center gap-3">
				<span
					class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					<Icon icon="fa6-brands:instagram" class="h-5 w-5" />
				</span>
				<div>
					<p class="font-semibold">Follow Us on Instagram</p>
					<p class="text-sm opacity-70">
						Stay updated on events and connect with us!
					</p>
				</div>
			</div>
			<a
				href="https://www.instagram.com/fyi.fcc/"
				target="_blank"
				class="preset-filled btn"
			>
				@fyi.fcc
			</a>
		</div>
	</div>

	<!-- Info Section -->
	<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="card dark:bg-surface-800 bg-white p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					👥
				</span>
				<h3 class="h4 font-bold">Who We Are</h3>
			</div>
			<div class="flex flex-col gap-1 opacity-80">
				<p class="font-semibold">Ages 20-35</p>
				<p>Young adults welcome!</p>
			</div>
		</div>

		<div class="card dark:bg-surface-800 bg-white p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					<Icon icon="fa6-brands:whatsapp" class="h-5 w-5" />
				</span>
				<h3 class="h4 font-bold">WhatsApp Group</h3>
			</div>
			<div class="flex flex-col gap-1 opacity-80">
				<p class="font-semibold">Stay Connected</p>
				<p>
					Join our WhatsApp group for updates on upcoming events and Bible
					studies. Ask Bro. Ymuz for details!
				</p>
			</div>
		</div>
	</div>

	<!-- How to Join -->
	<div class="card dark:bg-surface-800 mb-8 bg-white p-6">
		<h3 class="h3 mb-3 font-bold">How to Join</h3>
		<p class="mb-2">
			Whether you're a long-time member or new to the church, you're welcome to
			join us! We'd love to have you be a part of our community.
		</p>
		<p>
			Follow us on
			<a
				href="https://www.instagram.com/fyi.fcc/"
				target="_blank"
				class="anchor"
			>
				Instagram (@fyi.fcc)
			</a>
			for the latest updates, or reach out to Bro. Ymuz to join our WhatsApp group.
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
