<script>
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton'
	import NavButton from './NavButton.svelte'
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead"><p>logo here</p></svelte:fragment>
	<svelte:fragment slot="headline"
		><p class="text-center">
			© Copyright by Freedom in Christ Church Canada. All Rights Reserved.
		</p></svelte:fragment
	>
	<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
</AppBar>
