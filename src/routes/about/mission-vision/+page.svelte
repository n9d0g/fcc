<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let headData = $derived(data.headData)
	let breadcrumb = $derived(data.breadcrumb)
	let missionVision = $derived(data.missionVision)
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<div class="grid gap-6 md:grid-cols-2">
		<!-- mission -->
		<div class="card dark:bg-surface-800 bg-white p-6">
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
		<div class="card dark:bg-surface-800 bg-white p-6">
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
