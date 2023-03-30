<script lang="ts">
	import { Avatar, LightSwitch } from '@skeletonlabs/skeleton'
	import { AppBar } from '@skeletonlabs/skeleton'
	import Icon from '@iconify/svelte'
	import NavButton from '$lib/components/NavButton.svelte'
	import { activeNav } from '$lib/stores/store.js'
	import { drawerSettings, navOptions, openSideNav } from '$lib/utils'

	// variables
	let activeNavValue: string
	activeNav.subscribe((value) => (activeNavValue = value))
</script>

<div class="bg-surface-100-800-token">
	<AppBar
		id="top"
		gridColumns="grid-cols-3"
		slotDefault="place-self-center"
		slotTrail="place-content-end"
		class="container mx-auto"
	>
		<svelte:fragment slot="lead">
			<a href="/">
				<Avatar src="/apple-touch-icon.png" class="cursor-pointer w-8 h-8" />
			</a>
		</svelte:fragment>

		<nav class="hidden lg:flex justify-center items-center gap-4 z-10">
			{#key activeNavValue}
				{#each navOptions() as option}
					<NavButton text={option.title} link={option.href} nav={activeNavValue} />
				{/each}
			{/key}
		</nav>

		<svelte:fragment slot="trail">
			<LightSwitch class="z-0" />
			<button on:click={() => openSideNav(drawerSettings)} class="z-0">
				<Icon class="lg:hidden flex w-8 h-8 cursor-pointer" icon="cil:hamburger-menu" />
			</button>
		</svelte:fragment>
	</AppBar>
</div>
