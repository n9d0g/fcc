<script lang="ts">
	import { Avatar, LightSwitch } from '@skeletonlabs/skeleton'
	import { AppBar } from '@skeletonlabs/skeleton'
	import Icon from '@iconify/svelte'
	import NavButton from '$lib/components/NavButton.svelte'
	import { activeNav } from '$lib/stores/store.js'
	import { openSideNav } from '$lib/utils'
	import { navOptions, drawerSettings } from '$lib/constants'

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
			<a class="anchor" href="/" aria-label="Home Logo Button">
				<Avatar src="/apple-touch-icon.png" class="h-8 w-8 cursor-pointer" />
			</a>
		</svelte:fragment>

		<nav class="z-10 hidden items-center justify-center gap-4 lg:flex">
			{#key activeNavValue}
				{#each navOptions as option}
					<NavButton text={option.title} link={option.href} nav={activeNavValue} />
				{/each}
			{/key}
		</nav>

		<svelte:fragment slot="trail">
			<LightSwitch class="z-0" />
			<button on:click={() => openSideNav(drawerSettings)} class="z-0" aria-label="Mobile Nav Button">
				<Icon class="flex h-8 w-8 cursor-pointer lg:hidden" icon="cil:hamburger-menu" />
			</button>
		</svelte:fragment>
	</AppBar>
</div>
