<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import cover from '#lib/assets/events/2026/thanksgiving/dinner-hall-1.jpg'
	import dinnerHall2 from '#lib/assets/events/2026/thanksgiving/dinner-hall-2.jpg'
	import dinnerHall3 from '#lib/assets/events/2026/thanksgiving/dinner-hall-3.jpg'
	import dinnerTable1 from '#lib/assets/events/2026/thanksgiving/dinner-table-1.jpg'
	import dinnerTable2 from '#lib/assets/events/2026/thanksgiving/dinner-table-2.jpg'
	import dessertTable from '#lib/assets/events/2026/thanksgiving/dessert-table.jpg'
	import dessertHosts from '#lib/assets/events/2026/thanksgiving/dessert-hosts.jpg'
	import desserts from '#lib/assets/events/2026/thanksgiving/desserts.jpg'
	import worship from '#lib/assets/events/2026/thanksgiving/worship.jpg'
	import menWorship from '#lib/assets/ministries/men/men-worship-thanksgiving.mp4'

	// `span` sizes the tile; the mix below fills 2 and 4 column grids exactly
	const photos = [
		{
			url: dinnerHall3,
			alt: 'The FCC family seated at tables in the hall for Thanksgiving dinner',
			span: 'col-span-2 row-span-2',
		},
		{ url: dessertTable, alt: 'Two young women beside the Thanksgiving dessert table' },
		{ url: dinnerTable1, alt: 'FCC members sharing a meal around a decorated table' },
		{
			url: worship,
			alt: 'The congregation worshipping in front of a "Happy Thanksgiving 2026" slide',
			span: 'col-span-2',
		},
		{ url: dinnerTable2, alt: 'A table of FCC members smiling for a selfie at Thanksgiving dinner' },
		{ url: dessertHosts, alt: 'Volunteers standing behind the dessert table they prepared' },
		{ url: desserts, alt: 'Cupcakes and desserts on the Thanksgiving dessert table' },
		{ url: dinnerHall2, alt: 'Families and friends gathered around tables in the hall' },
	]
</script>

<FccLayout
	heading="Thanksgiving 2026"
	image={cover}
	imageAlt="FCC members gathered around tables in the hall for the Thanksgiving celebration"
	intro="“The Lord's name be praised forever.” Our church family gathered to worship, share a meal and give thanks together."
>
	<div class="space-y-16 md:space-y-20">
		<section aria-labelledby="gallery-title">
			<p class="eyebrow">Moments</p>
			<h2 id="gallery-title" class="h2 mt-3 mb-8">Giving thanks together</h2>
			<div class="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:gap-4 lg:grid-cols-4">
				{#each photos as photo (photo.url)}
					<div class="overflow-hidden rounded-2xl bg-surface-200 {photo.span ?? ''}">
						<img
							src={photo.url}
							alt={photo.alt}
							loading="lazy"
							class="size-full object-cover transition-transform duration-500 hover:scale-105"
						/>
					</div>
				{/each}
			</div>
		</section>

		<section class="grid items-center gap-8 md:grid-cols-5" aria-labelledby="men-worship">
			<!-- svelte-ignore a11y_media_has_caption -->
			<video
				controls
				preload="metadata"
				class="mx-auto aspect-9/16 max-h-[70vh] w-full max-w-sm rounded-2xl bg-primary-950 object-cover md:col-span-2"
			>
				<source src={menWorship} />
			</video>
			<div class="md:col-span-3">
				<p class="eyebrow">Worship</p>
				<h2 id="men-worship" class="h2 mt-3">A song from our men's ministry</h2>
				<p class="lede mt-4">
					The men of FCC led us in a song of thanksgiving during the celebration.
				</p>
				<a href="/ministries/men" class="btn btn-outline mt-6">Meet the men's ministry</a>
			</div>
		</section>
	</div>
</FccLayout>
