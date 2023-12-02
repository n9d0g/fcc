<script lang="ts">
	import { links } from '$lib/constants'

	export let pageInfo: any
</script>

<section
	class="container mx-auto flex flex-col items-center justify-center gap-16 py-32"
>
	<!-- header -->
	<h2 class="h2 text-center text-4xl font-bold" data-testid="nextevent-header">
		Next Event:
	</h2>

	<!-- hero picture -->
	<a
		class="anchor"
		href={links.zoom}
		data-testid="nextevent-zoom"
		aria-label="Zoom Banner Button"
	>
		<img
			class="h-auto md:max-h-[70vh] md:w-auto"
			src={pageInfo.invite}
			alt=""
		/>
	</a>

	<!-- view event calendar -->
	<div class="flex justify-center">
		<a
			class="bg-surface-200-700-token btn btn-lg text-black dark:text-white"
			href="/events">View Event Calendar</a
		>
	</div>
</section>
