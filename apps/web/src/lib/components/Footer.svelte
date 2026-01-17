<script lang="ts">
	import { links } from '$lib/constants'
	import FaFacebook from 'svelte-icons/fa/FaFacebook.svelte'
	import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte'
	import FaYoutube from 'svelte-icons/fa/FaYoutube.svelte'
	import pkgJsonInfo from '../../../package.json'
	import { format, addDays } from 'date-fns'
	import LightDarkToggle from '$lib/components/LightDarkToggle.svelte'

	const year = format(addDays(new Date(), 1), 'yyyy')
</script>

<footer class="bg-surface-300-700">
	<div class="container mx-auto px-4 py-8">
		<!-- Logo -->
		<div class="flex justify-center">
			<a class="" href="/" aria-label="Home Logo Button">
				<img
					src="/apple-touch-icon.png"
					alt="FCC Logo"
					class="h-20 w-auto cursor-pointer"
				/>
			</a>
		</div>

		<hr class="my-4 border-surface-400-600" />

		<!-- Social Links -->
		<div class="mx-auto my-4 flex max-w-[30rem] justify-center gap-1">
			<a
				class="p-4 text-surface-600-400 transition hover:text-red-600"
				href={links.socials.youtube}
				target="_blank"
				aria-label="YouTube Link"
			>
				<span class="block w-6"><FaYoutube /></span>
			</a>
			<a
				class="p-4 text-surface-600-400 transition hover:text-pink-500"
				href={links.socials.ig}
				target="_blank"
				aria-label="Instagram Link"
			>
				<span class="block w-6"><FaInstagram /></span>
			</a>
			<a
				class="p-4 text-surface-600-400 transition hover:text-blue-600"
				href={links.socials.fb}
				target="_blank"
				aria-label="Facebook Link"
			>
				<span class="block w-6"><FaFacebook /></span>
			</a>
		</div>

		<!-- Copyright -->
		<p class="text-center text-sm">
			© 2022-{year}, Copyright by
			<a class="font-bold transition-all hover:text-primary-400" href={links.njil}>
				NJIL Development.
			</a>
			All Rights Reserved.
		</p>
		<p class="mt-2 text-center">
			<a
				href={links.ghReleases}
				class="text-xs text-primary-600 no-underline hover:underline dark:text-primary-400"
			>
				v{pkgJsonInfo.version}
			</a>
		</p>

		<!-- Theme Toggle -->
		<div class="mt-4 flex justify-center">
			<LightDarkToggle />
		</div>
	</div>
</footer>
