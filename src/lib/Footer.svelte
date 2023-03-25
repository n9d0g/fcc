<script>
	import { AppBar, Avatar, LightSwitch } from '@skeletonlabs/skeleton'
	import FaFacebook from 'svelte-icons/fa/FaFacebook.svelte'
	import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte'
	import FaYoutube from 'svelte-icons/fa/FaYoutube.svelte'
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<a href="/">
			<Avatar src="/apple-touch-icon.png" class="cursor-pointer w-8 h-8" />
		</a>
	</svelte:fragment>
	<svelte:fragment slot="headline">
		<p class="text-center">© Copyright by Freedom in Christ Church Canada. All Rights Reserved.</p>
		<div class="flex justify-center logo-cloud gap:1 lg:gap-4 max-w-[30rem] mx-auto my-4">
			<a
				class="unstyled logo-item p-4 text-gray hover:text-youtube transition"
				href="https://www.youtube.com/@freedominchristchurchcanada"
				target="_blank"
			>
				<span class=" w-6"><FaYoutube /></span>
			</a>
			<a
				class="unstyled logo-item p-4 text-gray hover:text-instagram transition"
				href="https://www.instagram.com/fcc.canada/"
				target="_blank"
			>
				<span class="w-6"><FaInstagram /></span>
			</a>
			<a
				class="unstyled logo-item p-4 text-gray hover:text-facebook transition"
				href="https://www.facebook.com/groups/1667915316820460"
				target="_blank"
			>
				<span class="w-6"><FaFacebook /></span>
			</a>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
</AppBar>
