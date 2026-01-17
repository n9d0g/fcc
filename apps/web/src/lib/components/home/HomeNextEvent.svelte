<script lang="ts">
	import { links } from '$lib/constants'

	// Svelte 5 props
	let { pageInfo }: { pageInfo: { invite: string } } = $props()
</script>

<section class="container mx-auto flex flex-col items-center justify-center gap-16 py-32">
	<!-- header -->
	<h2 class="h2 text-center text-4xl font-bold" data-testid="nextevent-header">Next Event:</h2>

	<!-- hero picture -->
	<a
		class="anchor"
		href={links.zoom}
		data-testid="nextevent-zoom"
		aria-label="Zoom Banner Button"
	>
		<img class="h-auto md:max-h-[70vh] md:w-auto" src={pageInfo.invite} alt="" />
	</a>

	<!-- view event calendar -->
	<div class="flex justify-center">
		<a
			class="btn btn-lg bg-surface-200 text-surface-900 dark:bg-surface-700 dark:text-surface-50"
			href="/events"
		>
			View Event Calendar
		</a>
	</div>
</section>
