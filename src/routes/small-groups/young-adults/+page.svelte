<script lang="ts">
	import youngAdults from '#lib/assets/community/young-adults.jpg'
	import FccLayout from '#lib/components/FccLayout.svelte'
	import PhotoGallery from '#lib/components/PhotoGallery.svelte'
	import Icon from '@iconify/svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
	let gallery = $derived(data.gallery)
</script>

<FccLayout
	{title}
	{breadcrumb}
	{headData}
	image={youngAdults}
	imageAlt="FCC young adults at an evening hangout"
	imagePosition="center 35%"
>
	<!-- Welcome Section -->
	<div class="mb-12 max-w-3xl">
		<h2 class="h2 mb-5">Welcome to the Young Adults Small Group!</h2>
		<p class="lede">
			Join us for fellowship, prayer, and Bible study as we navigate life's
			journey together. Our Young Adults Small Group provides a welcoming
			environment for those in their 20s and 30s to connect, grow in faith, and
			build meaningful relationships.
		</p>
	</div>

	<!-- Connect With Us CTA -->
	<div class="card mb-10 p-6">
		<div class="flex flex-wrap items-center gap-4">
			<div class="flex items-center gap-3">
				<span
					class="icon-chip"
				>
					<Icon icon="fa6-brands:instagram" class="h-5 w-5" />
				</span>
				<div>
					<p class="font-semibold">Follow Us on Instagram</p>
					<p class="text-sm text-muted">
						Stay updated on events and connect with us!
					</p>
				</div>
			</div>
			<a
				href="https://www.instagram.com/fyi.fcc/"
				target="_blank"
				class="btn btn-primary"
			>
				@fyi.fcc
			</a>
		</div>
	</div>

	<!-- Info Section -->
	<div class="mb-12 grid grid-cols-1 gap-5 md:grid-cols-2">
		<div class="card p-6">
			<div class="mb-4 flex items-center gap-3">
				<span
					class="icon-chip"
				>
					👥
				</span>
				<h3 class="h4">Who We Are</h3>
			</div>
			<div class="flex flex-col gap-1 text-muted">
				<p class="font-semibold text-ink">Ages 20-35</p>
				<p>Young adults welcome!</p>
			</div>
		</div>

		<div class="card p-6">
			<div class="mb-4 flex items-center gap-3">
				<span
					class="icon-chip"
				>
					<Icon icon="fa6-brands:whatsapp" class="h-5 w-5" />
				</span>
				<h3 class="h4">WhatsApp Group</h3>
			</div>
			<div class="flex flex-col gap-1 text-muted">
				<p class="font-semibold text-ink">Stay Connected</p>
				<p>
					Join our WhatsApp group for updates on upcoming events and Bible
					studies. Ask Bro. Ymuz for details!
				</p>
			</div>
		</div>
	</div>

	<!-- How to Join -->
	<div class="card mb-12 p-6 md:p-8">
		<h3 class="h3 mb-4">How to Join</h3>
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
	{#if gallery?.photos}
		<PhotoGallery photos={gallery.photos} />
	{/if}
</FccLayout>
