<script lang="ts">
	import { Drawer } from '@skeletonlabs/skeleton'
	import { closeSideNav } from '$lib/utils'
	import { navOptions } from '$lib/constants'
</script>

<Drawer>
	<section class="lg:hidden flex flex-col gap-8 p-8 w-screen overflow-hidden">
		{#each navOptions as option}
			<a on:click={closeSideNav} href={option.href} class="btn flex justify-start focus:ring-0 focus:ring-offset-0">
				{option.title}
			</a>
		{/each}
	</section>
</Drawer>
