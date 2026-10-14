<script lang="ts">
	import Icon from '@iconify/svelte'
	import congregation from '#lib/assets/community/sunday-service.jpg'
	import ChurchMap from '#lib/components/ChurchMap.svelte'
	import ChurchBuilding3D from '#lib/components/ChurchBuilding3D.svelte'

	// Svelte 5 props
	let { links }: { links: { googleMaps: string; zoom: string } } = $props()
</script>

<section class="section bg-white">
	<div class="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
		<figure class="relative isolate">
			<img
				src={congregation}
				alt="The FCC congregation seated for a Sunday worship service"
				class="aspect-4/3 w-full rounded-3xl object-cover shadow-lift"
				loading="lazy"
			/>
			<div
				class="absolute -right-3 -bottom-3 -z-10 size-full rounded-3xl bg-secondary-100"
				aria-hidden="true"
			></div>
		</figure>

		<div>
			<p class="eyebrow">Plan your visit</p>
			<h2 class="h2 mt-3" data-testid="welcome-header">Come join us!</h2>
			<p class="lede mt-5" data-testid="welcome-subheader">
				Freedom in Christ Church is a volunteer-led Alliance church in
				Mississauga. We welcome you to our worship services every Sunday morning
				at 10:30am, both in person and online, so you can join us however suits
				you best.
			</p>

			<div class="mt-8 grid gap-4 sm:grid-cols-2">
				<div class="rounded-2xl border border-line bg-paper p-5">
					<span class="icon-chip">
						<Icon icon="lucide:map-pin" class="size-5" />
					</span>
					<p class="mt-4 font-semibold">In person</p>
					<a
						href={links.googleMaps}
						target="_blank"
						rel="noopener noreferrer"
						class="anchor mt-1 inline-block text-sm"
					>
						5225 Orbitor Drive, Unit 3, Mississauga, ON L4W 4Y8
					</a>
					<p class="mt-2 text-sm text-muted">
						Unit 3 is at the far end of the lot. Come in beside the
						<span class="font-medium text-ink">Kalayaan Community Centre</span> sign.
					</p>
				</div>
				<div class="rounded-2xl border border-line bg-paper p-5">
					<span class="icon-chip">
						<Icon icon="lucide:video" class="size-5" />
					</span>
					<p class="mt-4 font-semibold">Online</p>
					<p class="mt-1 text-sm text-muted">Join the livestream on Zoom.</p>
				</div>
			</div>

			<div class="mt-8 flex flex-wrap gap-3">
				<a
					class="btn btn-primary btn-lg"
					href={links.zoom}
					target="_blank"
					rel="noopener noreferrer"
					data-testid="welcome-zoom"
				>
					<Icon icon="lucide:video" class="size-4" />
					Join on Zoom
				</a>
				<a class="btn btn-outline btn-lg" href="/events">
					<Icon icon="lucide:calendar" class="size-4" />
					See what's on
				</a>
			</div>
		</div>
	</div>

	<div class="wrap mt-12 grid gap-6 md:mt-16">
		<ChurchMap class="md:h-[26rem]" />
		<ChurchBuilding3D class="md:h-[30rem]" />
	</div>
</section>
