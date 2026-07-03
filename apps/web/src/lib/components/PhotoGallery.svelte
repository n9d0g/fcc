<script lang="ts">
	import type { GalleryPhoto } from '$lib/types'

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
		<h3 class="h3 mb-4 font-bold">{title}</h3>
		<div
			class="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
		>
			{#each photos as photo, index (photo.url)}
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
