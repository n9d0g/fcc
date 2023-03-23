<script lang="ts">
	import { Avatar, LightSwitch } from '@skeletonlabs/skeleton'
	import { AppBar } from '@skeletonlabs/skeleton'
	import NavButton from './NavButton.svelte'
	import Icon from '@iconify/svelte'
	import { sideNavOpen } from '$lib/stores/store.js'

	let sideNavValue: boolean

	sideNavOpen.subscribe((value) => {
		sideNavValue = value
	})

	const handleSideNav = () => {
		sideNavOpen.set(!sideNavValue)
	}
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<a href="/">
			<Avatar src="/apple-touch-icon.png" class="cursor-pointer w-8 h-8" />
		</a>
	</svelte:fragment>
	<nav class="hidden lg:flex justify-center items-center gap-4">
		<NavButton text="Home" link="/" />
		<NavButton text="About" link="/about" />
		<NavButton text="Sermons" link="/sermons" />
		<NavButton text="Ministries" link="/ministries" />
		<NavButton text="Small Groups" link="/small-groups" />
		<NavButton text="Give" link="/give" />
	</nav>
	<svelte:fragment slot="trail">
		<LightSwitch class="hidden lg:flex" />
		<button on:click={handleSideNav}>
			<Icon class="lg:hidden flex w-8 h-8 cursor-pointer" icon="cil:hamburger-menu" />
		</button>
	</svelte:fragment>
</AppBar>
