<script lang="ts">
	import { Drawer, type DrawerStore } from '@skeletonlabs/skeleton'
	import { navOptions } from '$lib/constants'

	export let drawerStore: DrawerStore

	const closeSideNav = () => {
		drawerStore.close()
	}
</script>

<Drawer>
	<section class="flex flex-col gap-8 overflow-hidden p-8 xl:hidden">
		{#each navOptions as option}
			<a
				on:click={closeSideNav}
				href={option.href}
				class="align-center btn flex justify-start gap-2 focus:ring-0 focus:ring-offset-0"
			>
				<span class="align-center flex h-5 w-5 justify-center">
					<svelte:component this={option.icon} />
				</span>
				{option.title}
			</a>
		{/each}
	</section>
</Drawer>
