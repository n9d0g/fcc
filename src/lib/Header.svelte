<script lang="ts">
	import { Avatar, LightSwitch } from '@skeletonlabs/skeleton'
	import { AppBar } from '@skeletonlabs/skeleton'
	import NavButton from './NavButton.svelte'
	import Icon from '@iconify/svelte'
	import { sideNavOpen, activeNav } from '$lib/stores/store.js'

	// variables
	let sideNavValue: boolean
	sideNavOpen.subscribe((value) => {
		sideNavValue = value
	})

	let activeNavValue: string
	activeNav.subscribe((value) => (activeNavValue = value))

	// functions
	const handleSideNav = () => {
		sideNavOpen.set(!sideNavValue)
	}
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
				<NavButton text="Home" link="/" nav={activeNavValue} />
				<NavButton text="About" link="/about" nav={activeNavValue} />
				<NavButton text="Sermons" link="/sermons" nav={activeNavValue} />
				<NavButton text="Ministries" link="/ministries" nav={activeNavValue} />
				<NavButton text="Small Groups" link="/small-groups" nav={activeNavValue} />
				<NavButton text="Give" link="/give" nav={activeNavValue} />
			{/key}
		</nav>
		<svelte:fragment slot="trail">
			<LightSwitch class="z-0" />
			<button on:click={handleSideNav} class="z-0">
				<Icon class="lg:hidden flex w-8 h-8 cursor-pointer" icon="cil:hamburger-menu" />
			</button>
		</svelte:fragment>
	</AppBar>
</div>
