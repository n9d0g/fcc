<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton'
	import { AppBar } from '@skeletonlabs/skeleton'
	import NavButton from './NavButton.svelte'
	import Icon from '@iconify/svelte'
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead"><p>logo here</p></svelte:fragment>
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
		<Icon class="lg:hidden flex w-8 h-8" icon="cil:hamburger-menu" />
	</svelte:fragment>
</AppBar>
