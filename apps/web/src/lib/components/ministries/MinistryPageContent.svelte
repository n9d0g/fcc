<script lang="ts">
	import type { Snippet } from 'svelte'

	export interface MinistryHighlight {
		label: string
		sublabel?: string
	}

	export interface FeatureCard {
		emoji: string
		title: string
		description: string
	}

	export interface GalleryPhoto {
		url: string
		alt?: string
		caption?: string
	}

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

<!-- Welcome Section -->
<div class="mb-10">
	<h2 class="h2 mb-4 font-bold">{welcomeTitle}</h2>
	<p class="mb-4 text-lg">
		{welcomeDescription}
	</p>
	{#if highlight}
		<div class="flex items-center gap-3">
			<span class="text-primary-400 text-2xl">●</span>
			<div>
				<p class="font-semibold">{highlight.label}</p>
				{#if highlight.sublabel}
					<p class="text-sm opacity-70">{highlight.sublabel}</p>
				{/if}
			</div>
		</div>
	{/if}
</div>

<!-- Mission & Vision Cards -->
<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
	<div class="card bg-white p-5 dark:bg-surface-800">
		<div class="mb-3 flex items-center gap-3">
			<span
				class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
			>
				🎯
			</span>
			<h3 class="h4 font-bold">Mission</h3>
		</div>
		<p class="opacity-80">{mission}</p>
	</div>

	<div class="card bg-white p-5 dark:bg-surface-800">
		<div class="mb-3 flex items-center gap-3">
			<span
				class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
			>
				👁️
			</span>
			<h3 class="h4 font-bold">Vision</h3>
		</div>
		<p class="opacity-80">{vision}</p>
	</div>
</div>

<!-- What to Expect -->
<div class="mb-8">
	<h3 class="h3 mb-4 font-bold">{expectationsTitle}</h3>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each expectations as item}
			<div class="card bg-white p-5 dark:bg-surface-800">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						{item.emoji}
					</span>
					<h4 class="h4 font-bold">{item.title}</h4>
				</div>
				<p class="opacity-80">{item.description}</p>
			</div>
		{/each}
	</div>
</div>

<!-- How to Join -->
<div class="card mb-8 bg-white p-6 dark:bg-surface-800">
	<h3 class="h3 mb-3 font-bold">{howToJoinTitle}</h3>
	{@render howToJoinContent()}
</div>

<!-- Custom Content Slot (for additional media like videos/images) -->
{#if customContent}
	{@render customContent()}
{/if}

<!-- Photo Gallery from CMS -->
{#if gallery?.photos && gallery.photos.length > 0}
	<div>
		<h3 class="h3 mb-4 font-bold">{galleryTitle}</h3>
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
