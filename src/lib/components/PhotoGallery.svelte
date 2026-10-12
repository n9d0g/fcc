<script lang="ts">
	import type { GalleryPhoto } from '#lib/types.js'

	let {
		photos,
		title = 'Photo Gallery',
	}: {
		photos: GalleryPhoto[]
		title?: string
	} = $props()
</script>

{#if photos.length > 0}
	<div>
		<p class="eyebrow">Moments</p>
		<h3 class="h2 mt-3 mb-8">{title}</h3>
		<div
			class="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:grid-cols-3 md:gap-4 lg:grid-cols-4"
		>
			{#each photos as photo, index (photo.url)}
				<div
					class="overflow-hidden rounded-2xl bg-surface-200 {index === 0
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
						loading="lazy"
						class="size-full object-cover transition-transform duration-500 hover:scale-105"
					/>
				</div>
			{/each}
		</div>
	</div>
{/if}
