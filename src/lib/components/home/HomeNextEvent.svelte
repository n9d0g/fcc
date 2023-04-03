<script lang="ts">
	import { links } from '$lib/constants'

	export let pageInfo
</script>

<section class="container mx-auto flex flex-col justify-center items-center gap-16 my-32">
	<h2 class="text-2xl font-bold text-center">Next Event:</h2>
	<a href={links.zoom}>
		<img class="lg:w-[50rem] h-auto" src={pageInfo.weeklyInvite} alt="" />
	</a>
</section>
