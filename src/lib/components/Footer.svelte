<script lang="ts">
	import { links, navOptions } from '#lib/config/index.js'
	import Icon from '@iconify/svelte'
	import pkgJsonInfo from '../../../package.json'
	import { format, addDays } from 'date-fns'

	const year = format(addDays(new Date(), 1), 'yyyy')

	const exploreLinks = navOptions.filter((option) => option.title !== 'Login')

	const socials = [
		{ href: links.socials.youtube, icon: 'fa6-brands:youtube', label: 'YouTube' },
		{ href: links.socials.ig, icon: 'fa6-brands:instagram', label: 'Instagram' },
		{ href: links.socials.fb, icon: 'fa6-brands:facebook', label: 'Facebook' },
	]
</script>

<footer class="bg-primary-900 text-primary-100">
	<div class="wrap grid gap-12 py-16 md:grid-cols-12 lg:py-20">
		<!-- Brand -->
		<div class="md:col-span-5">
			<div class="flex items-center gap-3">
				<img
					src="/apple-touch-icon.png"
					alt=""
					class="size-12 rounded-full bg-white p-0.5"
				/>
				<p class="font-display text-xl font-semibold text-white">
					Freedom in Christ Church
				</p>
			</div>
			<p class="mt-5 max-w-sm leading-relaxed text-primary-200">
				A Christ-centred, Holy Spirit-led community committed to building strong
				relationships and planting healthy, reproducing churches.
			</p>
			<div class="mt-6 flex gap-2">
				{#each socials as social}
					<a
						class="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={social.label}
					>
						<Icon icon={social.icon} class="size-[1.1rem]" />
					</a>
				{/each}
			</div>
		</div>

		<!-- Visit -->
		<div class="md:col-span-4">
			<p class="eyebrow text-secondary-300">Visit us</p>
			<ul class="mt-4 space-y-3 text-primary-100">
				<li class="flex gap-3">
					<Icon icon="lucide:clock" class="mt-1 size-4 shrink-0 text-secondary-300" />
					<span>Sundays at 10:30 AM<br />In person &amp; on Zoom</span>
				</li>
				<li class="flex gap-3">
					<Icon icon="lucide:map-pin" class="mt-1 size-4 shrink-0 text-secondary-300" />
					<a
						href={links.googleMaps}
						target="_blank"
						rel="noopener noreferrer"
						class="hover:text-white hover:underline"
					>
						5225 Orbitor Drive, Unit 3<br />Mississauga, ON
					</a>
				</li>
			</ul>
		</div>

		<!-- Explore -->
		<div class="md:col-span-3">
			<p class="eyebrow text-secondary-300">Explore</p>
			<ul class="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-1">
				{#each exploreLinks as option}
					<li>
						<a href={option.href} class="text-primary-100 hover:text-white hover:underline">
							{option.title}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="border-t border-white/10">
		<div
			class="wrap flex flex-col items-center justify-between gap-2 py-6 text-sm text-primary-300 sm:flex-row"
		>
			<p>
				© 2022–{year}
				<a class="font-semibold text-primary-100 hover:text-white" href={links.njil}>
					NJIL Development
				</a>
			</p>
			<a href={links.ghReleases} class="text-xs hover:text-white hover:underline">
				v{pkgJsonInfo.version}
			</a>
		</div>
	</div>
</footer>
