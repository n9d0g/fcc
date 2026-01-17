<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	const { title, headData, breadcrumb, missionVision } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<div class="grid gap-6 md:grid-cols-2">
		<!-- mission -->
		<div class="card preset-tonal-surface p-6">
			<div class="mb-4 flex items-center gap-3">
				<span
					class="preset-filled-primary-500 flex h-12 w-12 items-center justify-center rounded-full text-2xl"
				>
					🎯
				</span>
				<h2 class="h2 font-bold">Our Mission</h2>
			</div>
			<p class="text-xl leading-relaxed opacity-90">{missionVision.mission}</p>
		</div>
		<!-- vision -->
		<div class="card preset-tonal-surface p-6">
			<div class="mb-4 flex items-center gap-3">
				<span
					class="preset-filled-primary-500 flex h-12 w-12 items-center justify-center rounded-full text-2xl"
				>
					👁️
				</span>
				<h2 class="h2 font-bold">Our Vision</h2>
			</div>
			<p class="text-xl leading-relaxed opacity-90">{missionVision.vision}</p>
		</div>
	</div>
</FccLayout>
