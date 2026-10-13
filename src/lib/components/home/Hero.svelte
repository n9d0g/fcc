<script lang="ts">
	import Icon from '@iconify/svelte'
	import churchFamily from '#lib/assets/community/church-family.jpg'
</script>

<section
	class="relative isolate flex min-h-[min(88svh,52rem)] items-end overflow-hidden bg-primary-950 lg:items-center"
>
	<img
		src={churchFamily}
		alt="The Freedom in Christ Church family gathered outdoors around the FCC banner"
		class="absolute inset-0 -z-20 size-full object-cover object-[60%_center] lg:object-center"
		fetchpriority="high"
	/>
	<!-- Even tint over the whole photo so the white copy stays readable -->
	<div class="absolute inset-0 -z-10 bg-primary-950/65" aria-hidden="true"></div>

	<div class="wrap w-full pt-40 pb-12 md:pb-16 lg:py-24">
		<!-- Soft shadow lifts the copy off the busier parts of the photo -->
		<div class="max-w-xl text-white [text-shadow:0_1px_14px_rgb(0_0_0/0.5)] lg:max-w-lg">
			<p class="eyebrow flex items-center gap-2 text-secondary-200">
				<span class="size-1.5 rounded-full bg-secondary-300"></span>
				Mississauga · Sundays 10:30 AM
			</p>
			<h1
				class="mt-5 text-5xl leading-[1.05] font-semibold text-white md:text-6xl lg:text-[4.25rem]"
			>
				Welcome to Freedom in Christ Church.
			</h1>
			<p class="mt-6 text-lg leading-relaxed text-white/95 md:text-xl">
				A Christ-centred, Holy Spirit-led community committed to the building of
				strong relationships and planting of healthy reproducing churches.
			</p>
			<div class="mt-9 flex flex-wrap gap-3">
				<a
					href="/about"
					class="btn btn-lg bg-white text-primary-900 [text-shadow:none] hover:bg-primary-50"
					data-sveltekit-preload-data="hover"
				>
					I'm new here
					<Icon icon="lucide:arrow-right" class="size-4" />
				</a>
				<a
					href="/sermons"
					class="btn btn-lg border border-white/50 text-white hover:bg-white/10"
					data-sveltekit-preload-data="hover"
				>
					<Icon icon="lucide:play" class="size-4" />
					Watch sermons
				</a>
			</div>
			<p class="mt-8 flex items-center gap-2 text-sm text-white/90">
				<Icon icon="lucide:heart-handshake" class="size-4 shrink-0 text-secondary-300" />
				Everyone's welcome. Come as you are, in person or online.
			</p>
		</div>
	</div>
</section>
