<script lang="ts">
	import { links } from '$lib/constants'
	import Icon from '@iconify/svelte'
	import pkgJsonInfo from '../../../package.json'
	import { format, addDays } from 'date-fns'
	import LightDarkToggle from '$lib/components/LightDarkToggle.svelte'

	const year = format(addDays(new Date(), 1), 'yyyy')
</script>

<footer class="bg-gray-100 dark:bg-surface-700">
	<div class="container mx-auto px-4 py-8">
		<hr class="border-gray-300 dark:border-surface-600 my-4" />

		<!-- Social Links -->
		<div class="mx-auto my-4 flex max-w-120 items-center justify-center gap-1">
			<a
				class="text-gray-600 dark:text-surface-400 p-4 transition hover:text-red-600"
				href={links.socials.youtube}
				target="_blank"
				aria-label="YouTube Link"
			>
				<Icon icon="fa6-brands:youtube" class="h-6 w-6" />
			</a>
			<a
				class="text-gray-600 dark:text-surface-400 p-4 transition hover:text-pink-500"
				href={links.socials.ig}
				target="_blank"
				aria-label="Instagram Link"
			>
				<Icon icon="fa6-brands:instagram" class="h-6 w-6" />
			</a>
			<a
				class="text-gray-600 dark:text-surface-400 p-4 transition hover:text-blue-600"
				href={links.socials.fb}
				target="_blank"
				aria-label="Facebook Link"
			>
				<Icon icon="fa6-brands:facebook" class="h-6 w-6" />
			</a>
		</div>

		<!-- Copyright -->
		<p class="text-center text-sm">
			© 2022-{year}, Copyright by
			<a
				class="hover:text-primary-400 font-bold transition-all"
				href={links.njil}
			>
				NJIL Development.
			</a>
			<br />
			All Rights Reserved.
		</p>
		<p class="mt-2 text-center">
			<a
				href={links.ghReleases}
				class="text-primary-600 dark:text-primary-400 text-xs no-underline hover:underline"
			>
				v{pkgJsonInfo.version}
			</a>
		</p>
	</div>
</footer>
