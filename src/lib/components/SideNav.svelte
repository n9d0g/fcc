<script lang="ts">
	import { Drawer } from '@skeletonlabs/skeleton'
	import { closeSideNav } from '$lib/utils'
	import { navOptions } from '$lib/constants'
</script>

<Drawer>
	<section class="lg:hidden flex flex-col gap-8 p-8 overflow-hidden">
		{#each navOptions as option}
			<a
				on:click={closeSideNav}
				href={option.href}
				class="btn flex gap-2 justify-start align-center focus:ring-0 focus:ring-offset-0"
			>
				<span class="flex justify-center align-center w-5 h-5">
					<svelte:component this={option.icon} />
				</span>
				{option.title}
			</a>
		{/each}
	</section>
</Drawer>
