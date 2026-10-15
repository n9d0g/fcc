<script lang="ts">
	import womenMinistry from '#lib/assets/community/women-ministry.jpg'
	import FccLayout from '#lib/components/FccLayout.svelte'
	import PhotoGallery from '#lib/components/PhotoGallery.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
	let gallery = $derived(data.gallery)
	let links = $derived(data.links)
</script>

<FccLayout
	{title}
	{breadcrumb}
	{headData}
	image={womenMinistry}
	imageAlt="Women of FCC gathered around the church banner"
	imagePosition="center 40%"
>
	<!-- Zoom Link Section -->
	<div class="card mb-10 p-6">
		<div class="flex flex-wrap items-center gap-4">
			<div class="flex items-center gap-3">
				<span
					class="icon-chip"
				>
					💻
				</span>
				<div>
					<p class="font-semibold">Zoom Meeting</p>
					<p class="text-sm text-muted">
						Meeting ID: {links.zoom2.meetingId} | Passcode: {links.zoom2.passcode}
					</p>
				</div>
			</div>
			<a
				href={links.zoom2.link}
				target="_blank"
				class="btn btn-primary"
			>
				Join Zoom Meeting
			</a>
		</div>
	</div>

	<!-- Study Groups Grid -->
	<h2 class="h2 mb-8">Our Study Groups</h2>
	<div class="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
		<div class="card p-6">
			<div class="mb-4 flex items-center gap-3">
				<span
					class="icon-chip"
				>
					🌍
				</span>
				<h4 class="h4">Europe/US/Canada</h4>
			</div>
			<div class="flex flex-col gap-1 text-muted">
				<p class="font-semibold text-ink">Every 1st Saturday (monthly)</p>
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

		<div class="card p-6">
			<div class="mb-4 flex items-center gap-3">
				<span
					class="icon-chip"
				>
					🇺🇸
				</span>
				<h4 class="h4">US/Canada</h4>
			</div>
			<div class="flex flex-col gap-1 text-muted">
				<p class="font-semibold text-ink">Every 1st Saturday (monthly)</p>
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

		<div class="card p-6">
			<div class="mb-4 flex items-center gap-3">
				<span
					class="icon-chip"
				>
					🇨🇦
				</span>
				<h4 class="h4">FCC Canada</h4>
			</div>
			<div class="flex flex-col gap-1 text-muted">
				<p class="font-semibold text-ink">Every last Saturday (monthly)</p>
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

		<div class="card p-6">
			<div class="mb-4 flex items-center gap-3">
				<span
					class="icon-chip"
				>
					🇵🇭
				</span>
				<h4 class="h4">Girls Chasing God (Philippines)</h4>
			</div>
			<div class="flex flex-col gap-1 text-muted">
				<p class="font-semibold text-ink">Every last Saturday (monthly)</p>
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

		<div class="card p-6">
			<div class="mb-4 flex items-center gap-3">
				<span
					class="icon-chip"
				>
					🌏
				</span>
				<h4 class="h4">Philippines/US/Canada</h4>
			</div>
			<div class="flex flex-col gap-1 text-muted">
				<p class="font-semibold text-ink">Every 4th Thursday (monthly)</p>
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
		class="card mx-auto mb-16 max-w-3xl p-8 text-center"
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
	{#if gallery?.photos}
		<PhotoGallery photos={gallery.photos} />
	{/if}
</FccLayout>
