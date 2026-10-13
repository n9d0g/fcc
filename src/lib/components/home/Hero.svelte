<script lang="ts">
	import Icon from '@iconify/svelte'
	import fellowship from '#lib/assets/community/women-fellowship.jpg'
	import youth from '#lib/assets/community/youth-retreat.jpg'
	import men from '#lib/assets/community/men-ministry.jpg'
</script>

<section class="relative isolate overflow-hidden">
	<!-- soft brand wash -->
	<div
		class="pointer-events-none absolute -top-40 -right-40 -z-10 size-144 rounded-full bg-secondary-200/40 blur-3xl"
		aria-hidden="true"
	></div>
	<div
		class="pointer-events-none absolute -bottom-48 -left-32 -z-10 size-120 rounded-full bg-tertiary-100/60 blur-3xl"
		aria-hidden="true"
	></div>

	<div class="wrap grid items-center gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
		<!-- Copy -->
		<div class="lg:col-span-5">
			<p class="eyebrow flex items-center gap-2">
				<span class="size-1.5 rounded-full bg-secondary-500"></span>
				Mississauga · Sundays 10:30 AM
			</p>
			<h1 class="mt-5 text-5xl leading-[1.05] font-semibold md:text-6xl lg:text-[4.25rem]">
				Welcome to Freedom in Christ Church.
			</h1>
			<p class="lede mt-6 max-w-xl">
				A Christ-centred, Holy Spirit-led community committed to the building of strong relationships and planting of
				healthy reproducing churches.
			</p>
			<div class="mt-9 flex flex-wrap gap-3">
				<a href="/about" class="btn btn-primary btn-lg" data-sveltekit-preload-data="hover">
					I'm new here
					<Icon icon="lucide:arrow-right" class="size-4" />
				</a>
				<a href="/sermons" class="btn btn-outline btn-lg" data-sveltekit-preload-data="hover">
					<Icon icon="lucide:play" class="size-4" />
					Watch sermons
				</a>
			</div>
		</div>

		<!-- Photo collage -->
		<div class="relative lg:col-span-7">
			<div class="grid grid-cols-6 grid-rows-[auto_auto] gap-3 sm:gap-4">
				<figure class="col-span-6 overflow-hidden rounded-3xl shadow-lift sm:col-span-4 sm:row-span-2">
					<img
						src={fellowship}
						alt="Women of FCC sharing a meal together at a church fellowship"
						class="aspect-4/3 size-full object-cover sm:aspect-auto"
						fetchpriority="high"
					/>
				</figure>
				<figure class="col-span-3 overflow-hidden rounded-3xl shadow-soft sm:col-span-2">
					<img
						src={youth}
						alt="FCC youth waving by a lake on a fall outing"
						class="aspect-square size-full object-cover"
					/>
				</figure>
				<figure class="col-span-3 overflow-hidden rounded-3xl shadow-soft sm:col-span-2">
					<img
						src={men}
						alt="FCC men's ministry gathered outdoors for a summer get-together"
						class="aspect-square size-full object-cover object-[35%_center]"
					/>
				</figure>
			</div>

			<!-- floating welcome note -->
			<div class="card absolute -bottom-6 left-4 hidden max-w-[16rem] items-center gap-3 p-4 sm:flex lg:-left-8">
				<span class="icon-chip">
					<Icon icon="lucide:heart-handshake" class="size-5" />
				</span>
				<p class="text-sm leading-snug">
					<span class="font-semibold">Everyone's welcome.</span>
					<span class="text-muted">Come as you are, in person or online.</span>
				</p>
			</div>
		</div>
	</div>
</section>
