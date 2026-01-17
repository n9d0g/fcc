<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	const { title, breadcrumb, headData, gallery } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<!-- Welcome Section -->
	<div class="mb-10">
		<h2 class="h2 mb-4 font-bold">
			Welcome to Our Women's Ministry Gathering!
		</h2>
		<p class="text-lg">
			At Freedom in Christ Church, we celebrate the strength, wisdom, and beauty
			that women bring to our community. Our Women's Ministry Gathering is a
			monthly opportunity for women to come together, share life's journey, and
			grow in faith and friendship. Join us each month for a warm and inviting
			time of connection and sisterhood.
		</p>
	</div>

	<!-- Mission & Vision Cards -->
	<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="card preset-tonal-surface p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					🎯
				</span>
				<h3 class="h4 font-bold">Mission</h3>
			</div>
			<p class="opacity-80">
				Our mission is to create a vibrant and supportive community where women
				can thrive in their faith, deepen their relationships with one another,
				and find encouragement for the unique challenges they face. Through our
				monthly gatherings, we aim to empower women to live out their faith in
				every area of life.
			</p>
		</div>

		<div class="card preset-tonal-surface p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					👁️
				</span>
				<h3 class="h4 font-bold">Vision</h3>
			</div>
			<p class="opacity-80">
				We envision a Women's Ministry that nurtures a sense of belonging,
				fosters spiritual growth, and equips women to be confident and
				compassionate influencers in their families, workplaces, and
				communities.
			</p>
		</div>
	</div>

	<!-- What to Expect -->
	<div class="mb-8">
		<h3 class="h3 mb-4 font-bold">What to Expect</h3>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			<div class="card preset-tonal-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						🤝
					</span>
					<h4 class="h4 font-bold">Fellowship</h4>
				</div>
				<p class="opacity-80">
					Building meaningful connections with fellow women in the church.
				</p>
			</div>

			<div class="card preset-tonal-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						📖
					</span>
					<h4 class="h4 font-bold">Spiritual Growth</h4>
				</div>
				<p class="opacity-80">
					Engaging in discussions, studies, and activities that encourage
					personal and collective spiritual growth.
				</p>
			</div>

			<div class="card preset-tonal-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						💜
					</span>
					<h4 class="h4 font-bold">Support & Encouragement</h4>
				</div>
				<p class="opacity-80">
					Providing a safe space to share joys, challenges, and prayer requests.
				</p>
			</div>

			<div class="card preset-tonal-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						📚
					</span>
					<h4 class="h4 font-bold">Practical Teaching</h4>
				</div>
				<p class="opacity-80">
					Receiving practical teachings and insights relevant to the diverse
					roles women play in life.
				</p>
			</div>

			<div class="card preset-tonal-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						🙌
					</span>
					<h4 class="h4 font-bold">Service Opportunities</h4>
				</div>
				<p class="opacity-80">
					Exploring ways to serve and make a positive impact in the church and
					community.
				</p>
			</div>

			<div class="card preset-tonal-surface p-5">
				<div class="mb-3 flex items-center gap-3">
					<span
						class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
					>
						📅
					</span>
					<h4 class="h4 font-bold">Join Us Every Month</h4>
				</div>
				<p class="opacity-80">
					Connect with other women in the church, share stories, and build
					lasting friendships.
				</p>
			</div>
		</div>
	</div>

	<!-- How to Join -->
	<div class="card preset-tonal-secondary mb-8 p-6">
		<h3 class="h3 mb-3 font-bold">How to Join</h3>
		<p class="mb-2">
			Whether you're a regular attendee or a first-timer, your presence is
			cherished, and we look forward to welcoming you. For more details, please
			feel free to contact Sis
			<a href="https://www.facebook.com/omarcelinozarate" class="anchor"
				>Olive Zarate</a
			>.
		</p>
		<p>
			Come and be a part of a community where women are empowered to embrace
			their identity, grow in faith, and support one another through life's
			journey. Join us at our next Women's Ministry Gathering for a delightful
			time of fellowship, growth, and encouragement.
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
