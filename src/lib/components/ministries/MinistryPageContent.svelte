<script lang="ts">
	import type { Snippet } from 'svelte'
	import Icon from '@iconify/svelte'

	export interface MinistryHighlight {
		label: string
		sublabel?: string
	}

	export interface FeatureCard {
		emoji: string
		title: string
		description: string
	}

	import PhotoGallery from '#lib/components/PhotoGallery.svelte'
	import type { GalleryPhoto } from '#lib/types.js'

	interface Props {
		// Welcome section
		welcomeTitle: string
		welcomeDescription: string
		highlight?: MinistryHighlight

		// Mission & Vision
		mission: string
		vision: string

		// What to Expect
		expectationsTitle?: string
		expectations: FeatureCard[]

		// How to Join
		howToJoinTitle?: string
		howToJoinContent: Snippet

		// Gallery from CMS
		gallery?: { photos: GalleryPhoto[] }
		galleryTitle?: string

		// Custom content slot (for additional media like videos)
		customContent?: Snippet
	}

	let {
		welcomeTitle,
		welcomeDescription,
		highlight,
		mission,
		vision,
		expectationsTitle = 'What to Expect',
		expectations,
		howToJoinTitle = 'How to Join',
		howToJoinContent,
		gallery,
		galleryTitle = 'Photo Gallery',
		customContent,
	}: Props = $props()
</script>

<div class="space-y-16 md:space-y-20">
	<!-- Welcome + Mission & Vision -->
	<div class="grid gap-10 lg:grid-cols-12 lg:gap-14">
		<div class="lg:col-span-7">
			<h2 class="h2">{welcomeTitle}</h2>
			<p class="lede mt-5">{welcomeDescription}</p>
			{#if highlight}
				<div
					class="mt-6 inline-flex items-center gap-3 rounded-full border border-secondary-200 bg-secondary-50 py-2 pr-5 pl-2"
				>
					<span
						class="flex size-8 items-center justify-center rounded-full bg-secondary-600 text-white"
					>
						<Icon icon="lucide:calendar-heart" class="size-4" />
					</span>
					<span class="text-sm">
						<span class="font-semibold">{highlight.label}</span>
						{#if highlight.sublabel}
							<span class="text-muted"> · {highlight.sublabel}</span>
						{/if}
					</span>
				</div>
			{/if}
		</div>

		<div class="space-y-4 lg:col-span-5">
			<div class="card p-6">
				<p class="eyebrow flex items-center gap-2">
					<Icon icon="lucide:target" class="size-4" /> Mission
				</p>
				<p class="mt-3 leading-relaxed text-muted">{mission}</p>
			</div>
			<div class="card p-6">
				<p class="eyebrow flex items-center gap-2">
					<Icon icon="lucide:eye" class="size-4" /> Vision
				</p>
				<p class="mt-3 leading-relaxed text-muted">{vision}</p>
			</div>
		</div>
	</div>

	<!-- What to Expect -->
	<div>
		<h3 class="h2">{expectationsTitle}</h3>
		<div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each expectations as item}
				<div class="card p-6">
					<span class="icon-chip">{item.emoji}</span>
					<h4 class="h4 mt-5">{item.title}</h4>
					<p class="mt-2 text-muted">{item.description}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- How to Join -->
	<div
		class="relative isolate overflow-hidden rounded-3xl bg-primary-800 p-8 text-primary-50 md:p-12 [&_.anchor]:text-white [&_.anchor]:decoration-secondary-300 [&_p]:text-primary-100"
	>
		<div
			class="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-primary-700"
			aria-hidden="true"
		></div>
		<p class="eyebrow text-secondary-300">Get involved</p>
		<h3 class="h2 mt-3 mb-5 text-white">{howToJoinTitle}</h3>
		<div class="max-w-3xl space-y-3 text-lg leading-relaxed">
			{@render howToJoinContent()}
		</div>
	</div>

	<!-- Custom Content Slot (for additional media like videos/images) -->
	{#if customContent}
		<div>
			{@render customContent()}
		</div>
	{/if}

	<!-- Photo Gallery from CMS -->
	{#if gallery?.photos && gallery.photos.length > 0}
		<PhotoGallery photos={gallery.photos} title={galleryTitle} />
	{/if}
</div>
