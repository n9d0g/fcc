<script lang="ts">
	import { version } from '$app/environment'
	import { links } from '$lib/constants'
	import { AppBar, Avatar, LightSwitch } from '@skeletonlabs/skeleton'
	import FaFacebook from 'svelte-icons/fa/FaFacebook.svelte'
	import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte'
	import FaYoutube from 'svelte-icons/fa/FaYoutube.svelte'
	import GoGitCommit from 'svelte-icons/go/GoGitCommit.svelte'
</script>

<div class="bg-surface-100-800-token">
	<AppBar
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
		<svelte:fragment slot="headline">
			<hr class="my-4" />
			<div class="flex justify-center logo-cloud gap:1 lg:gap-4 max-w-[30rem] mx-auto my-4">
				<a class="unstyled logo-item p-4 text-gray hover:text-youtube transition" href={links.youtube} target="_blank">
					<span class=" w-6"><FaYoutube /></span>
				</a>
				<a class="unstyled logo-item p-4 text-gray hover:text-instagram transition" href={links.ig} target="_blank">
					<span class="w-6"><FaInstagram /></span>
				</a>
				<a class="unstyled logo-item p-4 text-gray hover:text-facebook transition" href={links.fb} target="_blank">
					<span class="w-6"><FaFacebook /></span>
				</a>
			</div>
			<a
				href={links.ghReleases}
				class="flex justify-center items-center mx-auto my-4 text-sm text-surface-400 hover:text-secondary-500 w-fit italic"
			>
				v{version} (&nbsp;
				<span class="flex items-center justify-center w-4 h-4"><GoGitCommit /></span>

				<!-- svelte-ignore missing-declaration -->
				&nbsp;{__LAST_COMMIT__.slice(0, 7)})
			</a>
			<p class="text-center">© Copyright by Freedom in Christ Church Canada. All Rights Reserved.</p>
		</svelte:fragment>
		<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
	</AppBar>
</div>
