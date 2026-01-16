<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import LandingPageGrid from '$lib/components/LandingPageGrid.svelte'

	export let data
	const { title, breadcrumb, headData, gallery } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<!-- Welcome Section -->
	<div class="mb-10">
		<h2 class="h2 mb-4 font-bold">Welcome to Our Praise and Worship Ministry!</h2>
		<p class="text-lg">
			At Freedom in Christ Church, we believe that worship is a powerful
			expression of our love and gratitude to God. Our Praise and Worship
			Ministry is at the heart of our community, dedicated to creating an
			atmosphere where individuals can encounter God through music. Whether
			you're an experienced musician or a passionate beginner, we invite you to
			be a part of something truly special.
		</p>
	</div>

	<!-- Mission & Vision Cards -->
	<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="card variant-ghost-surface p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="variant-filled-primary flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					🎯
				</span>
				<h3 class="h4 font-bold">Mission</h3>
			</div>
			<p class="opacity-80">
				Our mission is to lead the congregation into the presence of God through
				vibrant and authentic worship. We strive to create an environment where
				people can connect with God on a deep and personal level, experiencing
				the transformative power of His love.
			</p>
		</div>

		<div class="card variant-ghost-surface p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="variant-filled-primary flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					👁️
				</span>
				<h3 class="h4 font-bold">Vision</h3>
			</div>
			<p class="opacity-80">
				We envision a community of worshippers who are not only skilled
				musicians but also individuals deeply committed to a lifestyle of
				worship. Through our music, we aim to inspire, encourage, and uplift the
				spirits of those who gather for worship, fostering a sense of unity and
				connection with God.
			</p>
		</div>
	</div>

	<!-- Join the Band -->
	<div class="mb-8">
		<h3 class="h3 mb-4 font-bold">Join the Band</h3>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			<div class="card variant-ghost-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="variant-filled-primary flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						🎸
					</span>
					<h4 class="h4 font-bold">Guitar</h4>
				</div>
				<p class="opacity-80">Electric & Acoustic</p>
			</div>

			<div class="card variant-ghost-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="variant-filled-primary flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						🥁
					</span>
					<h4 class="h4 font-bold">Drums</h4>
				</div>
				<p class="opacity-80">Electric Drums & Cajon</p>
			</div>

			<div class="card variant-ghost-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="variant-filled-primary flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						🎹
					</span>
					<h4 class="h4 font-bold">Keyboard</h4>
				</div>
				<p class="opacity-80">Electric Keyboard</p>
			</div>

			<div class="card variant-ghost-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="variant-filled-primary flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						🎤
					</span>
					<h4 class="h4 font-bold">Vocals</h4>
				</div>
				<p class="opacity-80">Lead & Backup</p>
			</div>
		</div>
		<p class="mt-4 opacity-80">
			No matter your skill level, we believe that worship is a collective
			effort, and every contribution is valuable. If you play another
			instrument, bring it and let's jam together!
		</p>
	</div>

	<!-- How to Join -->
	<div class="card variant-soft-secondary mb-8 p-6">
		<h3 class="h3 mb-3 font-bold">How to Join</h3>
		<p class="mb-2">
			To join our Praise and Worship Ministry, simply <a
				href="emailto:fcc.church.canada@gmail.com"
				class="anchor">send an email</a
			>
			or
			<a href="https://www.instagram.com/fcc.canada/" class="anchor"
				>message us on our Instagram account</a
			>, expressing your interest. Let us know which instrument you play or if
			you're interested in vocals. We'll be happy to connect with you, provide
			more information, and discuss how you can become a vital part of our
			worship team.
		</p>
		<p>
			Join us as we lift our voices and instruments in harmony, creating an
			atmosphere where God's presence is not only felt but celebrated. We look
			forward to welcoming you into our Praise and Worship family at FCC!
		</p>
	</div>

	<!-- Photo Gallery -->
	{#if gallery?.photos && gallery.photos.length > 0}
		<div class="mb-8">
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

	<LandingPageGrid items={data.landingPageItems} />
</FccLayout>
