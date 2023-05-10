<script lang="ts">
	import { links } from '$lib/constants'

	export let pageInfo: any
</script>

<section class="container mx-auto my-32 flex flex-col items-center justify-center gap-16">
	<h2 class="h2 text-center text-4xl font-bold" data-testid="nextevent-header">Next Event:</h2>
	<a class="anchor" href={links.zoom} data-testid="nextevent-zoom" aria-label="Zoom Banner Button">
		<img class="h-auto lg:w-[50rem]" src={pageInfo.weeklyInvite} alt="" />
	</a>
</section>
