<script lang="ts">
	import { links } from '$lib/constants'

	export let pageInfo
</script>

<section class="container mx-auto my-32 flex flex-col items-center justify-center gap-16">
	<h2 class="text-center text-2xl font-bold">Next Event:</h2>
	<a href={links.zoom}>
		<img class="h-auto lg:w-[50rem]" src={pageInfo.weeklyInvite} alt="" />
	</a>
</section>
