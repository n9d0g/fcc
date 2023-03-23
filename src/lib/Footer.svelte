<script>
	import { AppBar, Avatar, LightSwitch } from '@skeletonlabs/skeleton'
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<a href="/">
			<Avatar src="/apple-touch-icon.png" class="cursor-pointer w-8 h-8" />
		</a>
	</svelte:fragment>
	<svelte:fragment slot="headline"
		><p class="text-center">
			© Copyright by Freedom in Christ Church Canada. All Rights Reserved.
		</p></svelte:fragment
	>
	<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
</AppBar>
