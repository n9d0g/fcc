<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
	let gallery = $derived(data.gallery)
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<!-- Zoom Link Section -->
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
						Meeting ID: 480 798 2806 | Passcode: FCC2025
					</p>
				</div>
			</div>
			<a
				href="https://tinyurl.com/fcczoom2"
				target="_blank"
				class="preset-filled btn"
			>
				Join Zoom Meeting
			</a>
		</div>
	</div>

	<!-- Study Groups Grid -->
	<h3 class="h3 mb-4 font-bold">Our Study Groups</h3>
	<div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
		<div class="card dark:bg-surface-800 bg-white p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					🌍
				</span>
				<h4 class="h4 font-bold">Europe/US/Canada</h4>
			</div>
			<div class="flex flex-col gap-1 opacity-80">
				<p class="font-semibold">Every 1st Saturday (monthly)</p>
				<p>Toronto/Connecticut: 9:30AM</p>
				<p>UK: 2:30PM</p>
				<p>Manila: 9:30PM</p>
				<p class="mt-2">
					Study: <a
						href="https://www.easyenglish.bible/psalms/"
						class="anchor"
						target="_blank"
					>
						Book of Psalms
					</a>
				</p>
			</div>
		</div>

		<div class="card dark:bg-surface-800 bg-white p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					🇺🇸
				</span>
				<h4 class="h4 font-bold">US/Canada</h4>
			</div>
			<div class="flex flex-col gap-1 opacity-80">
				<p class="font-semibold">Every 1st Saturday (monthly)</p>
				<p>LA: 8:00AM</p>
				<p>AZ: 9:00AM</p>
				<p>Toronto: 11:00PM</p>
				<p class="mt-2">
					Study: <a
						href="https://www.biblestudytools.com/acts/"
						class="anchor"
						target="_blank"
					>
						Book of Acts
					</a>
				</p>
			</div>
		</div>

		<div class="card dark:bg-surface-800 bg-white p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					🇨🇦
				</span>
				<h4 class="h4 font-bold">FCC Canada</h4>
			</div>
			<div class="flex flex-col gap-1 opacity-80">
				<p class="font-semibold">Every last Saturday (monthly)</p>
				<p>Toronto: 9:00AM</p>
				<p class="mt-2">
					Study: <a
						href="https://www.studylight.org/commentary/james.html"
						class="anchor"
						target="_blank"
					>
						Book of James
					</a>
				</p>
			</div>
		</div>

		<div class="card dark:bg-surface-800 bg-white p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					🇵🇭
				</span>
				<h4 class="h4 font-bold">Girls Chasing God (Philippines)</h4>
			</div>
			<div class="flex flex-col gap-1 opacity-80">
				<p class="font-semibold">Every last Saturday (monthly)</p>
				<p>Manila: 8:00PM</p>
				<p>Toronto: 8:00AM</p>
				<p class="mt-2">
					Study: <a
						href="https://www.studylight.org/commentary/mark.html"
						class="anchor"
						target="_blank"
					>
						Book of Mark
					</a>
				</p>
			</div>
		</div>

		<div class="card dark:bg-surface-800 bg-white p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					🌏
				</span>
				<h4 class="h4 font-bold">Philippines/US/Canada</h4>
			</div>
			<div class="flex flex-col gap-1 opacity-80">
				<p class="font-semibold">Every 4th Thursday (monthly)</p>
				<p>Toronto: 8:00AM</p>
				<p>Manila: 8:00PM</p>
				<p class="mt-2">
					Study: <a
						href="http://www.biblestorytelling.org/devotions/List%20Women%20Bible%20Stories%20PDF%202-9-15.pdf"
						class="anchor"
						target="_blank"
					>
						Women in the Bible
					</a>
				</p>
			</div>
		</div>
	</div>

	<!-- About & Contact Section -->
	<div
		class="card dark:bg-surface-800 mx-auto mb-8 max-w-3xl bg-white p-6 text-center"
	>
		<p class="mb-4">
			These bible study groups meet only once a month with the purpose of using
			the other weeks for discipling their own small groups in their local
			churches or neighborhoods. Study materials are sent out in advance, then
			we gather to discuss, to dig deeper, to fellowship, and to pray for one
			another.
		</p>
		<div>
			<p class="mb-2 font-semibold">
				If you'd like to join any of our small groups, please contact sis Joi:
			</p>
			<p>
				<a
					href="mailto:irenejocelyn127@gmail.com"
					class="anchor"
					target="_blank"
				>
					irenejocelyn127@gmail.com
				</a>
				<span class="mx-2">|</span>
				<a
					href="https://www.instagram.com/joifulworld/"
					class="anchor"
					target="_blank"
				>
					@joifulworld
				</a>
				on Threads and IG
			</p>
		</div>
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
