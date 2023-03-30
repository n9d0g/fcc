<script lang="ts">
	import { Drawer } from '@skeletonlabs/skeleton'
	import { navOptions, closeSideNav } from '$lib/utils'
</script>

<Drawer>
	<section class="lg:hidden flex flex-col gap-8 p-8 w-screen">
		{#each navOptions() as option}
			<a on:click={closeSideNav} class="btn flex justify-start" href={option.href}>
				{option.title}
			</a>
		{/each}
	</section>
</Drawer>
