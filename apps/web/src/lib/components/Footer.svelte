<script lang="ts">
	import { links } from '$lib/constants'
	import { AppBar, Avatar, LightSwitch } from '@skeletonlabs/skeleton'
	import FaFacebook from 'svelte-icons/fa/FaFacebook.svelte'
	import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte'
	import FaYoutube from 'svelte-icons/fa/FaYoutube.svelte'
</script>

<div class="bg-surface-100-800-token">
	<AppBar
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
		<svelte:fragment slot="headline">
			<hr class="my-4" />
			<div
				class="gap:1 logo-cloud mx-auto my-4 flex max-w-[30rem] justify-center lg:gap-4"
			>
				<a
					class="text-gray anchor logo-item hover:text-youtube p-4 transition"
					href={links.youtube}
					target="_blank"
					aria-label="YouTube Link"
				>
					<span class=" w-6"><FaYoutube /></span>
				</a>
				<a
					class="text-gray anchor logo-item hover:text-instagram p-4 transition"
					href={links.ig}
					target="_blank"
					aria-label="Instagram Link"
				>
					<span class="w-6"><FaInstagram /></span>
				</a>
				<a
					class="text-gray anchor logo-item hover:text-facebook p-4 transition"
					href={links.fb}
					target="_blank"
					aria-label="Facebook Link"
				>
					<span class="w-6"><FaFacebook /></span>
				</a>
			</div>
			<p class="text-center">
				© Copyright by Freedom in Christ Church Canada. All Rights Reserved.
			</p>
		</svelte:fragment>
		<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
	</AppBar>
</div>
