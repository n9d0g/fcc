<script lang="ts">
	import { links } from '$lib/constants'
	import { AppBar, Avatar, LightSwitch } from '@skeletonlabs/skeleton'
	import FaFacebook from 'svelte-icons/fa/FaFacebook.svelte'
	import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte'
	import FaYoutube from 'svelte-icons/fa/FaYoutube.svelte'
	import pkgJsonInfo from '../../../../../package.json'
</script>

<div class="bg-surface-400-500-token">
	<AppBar
		background="bg-surface-400-500-token"
		gridColumns="grid-cols-3"
		slotDefault="place-self-center"
		slotTrail="place-content-end"
		class="container mx-auto"
	>
		<svelte:fragment slot="lead">
			<a class="anchor" href="/" aria-label="Home Logo Button">
				<Avatar
					src="/apple-touch-icon.png"
					class="h-20 w-auto cursor-pointer"
				/>
			</a>
		</svelte:fragment>
		<svelte:fragment slot="headline">
			<hr class="my-4" />
			<div
				class="logo-cloud mx-auto my-4 flex max-w-[30rem] justify-center gap-1"
			>
				<a
					class="text-gray anchor logo-item p-4 transition hover:text-youtube"
					href={links.socials.youtube}
					target="_blank"
					aria-label="YouTube Link"
				>
					<span class=" w-6"><FaYoutube /></span>
				</a>
				<a
					class="text-gray anchor logo-item p-4 transition hover:text-instagram"
					href={links.socials.ig}
					target="_blank"
					aria-label="Instagram Link"
				>
					<span class="w-6"><FaInstagram /></span>
				</a>
				<a
					class="text-gray anchor logo-item p-4 transition hover:text-facebook"
					href={links.socials.fb}
					target="_blank"
					aria-label="Facebook Link"
				>
					<span class="w-6"><FaFacebook /></span>
				</a>
			</div>
			<p class="text-center">
				© Copyright by Freedom in Christ Church Canada. All Rights Reserved.
				<br />
				<a
					href={links.ghReleases}
					class="anchor text-center text-xs text-primary-200 no-underline"
				>
					v{pkgJsonInfo.version}
				</a>
			</p>
		</svelte:fragment>
		<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
	</AppBar>
</div>
