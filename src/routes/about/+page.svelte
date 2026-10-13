<script lang="ts">
	import churchFamily from '#lib/assets/community/church-family-2.jpg'
	import FccLayout from '#lib/components/FccLayout.svelte'
	import LandingPageGrid from '#lib/components/LandingPageGrid.svelte'
	import ChurchMap from '#lib/components/ChurchMap.svelte'
	import Icon from '@iconify/svelte'
	import { church, links } from '#lib/config/index.js'

	// Svelte 5 props
	let { data }: { data: any } = $props()

	// Derived values from data (reactive when data changes)
	let title = $derived(data.title)
	let headData = $derived(data.headData)
	let breadcrumb = $derived(data.breadcrumb)
</script>

<FccLayout
	{title}
	{breadcrumb}
	{headData}
	image={churchFamily}
	imageAlt="The Freedom in Christ Church family gathered outdoors"
	imagePosition="center 40%"
	intro="Get to know the family at Freedom in Christ Church, a volunteer-led Alliance church in Mississauga."
>
	<div class="space-y-20 md:space-y-28">
		<LandingPageGrid items={data.landingPageItems} />

		<!-- Where to find us -->
		<section
			class="grid gap-10 lg:grid-cols-12 lg:gap-14"
			aria-labelledby="visit-us"
		>
			<div class="lg:col-span-5">
				<p class="eyebrow">Visit us</p>
				<h2 id="visit-us" class="h2 mt-3">Where to find us</h2>
				<p class="lede mt-4">
					We meet every Sunday at 10:30 AM in Mississauga. Can't make it in person?
					Join us online on Zoom.
				</p>
				<ul class="mt-8 space-y-4">
					<li class="flex gap-4">
						<span class="icon-chip"><Icon icon="lucide:clock" class="size-5" /></span>
						<span>
							<span class="block font-semibold">Sunday worship</span>
							<span class="text-muted text-sm">10:30 AM, in person &amp; on Zoom</span>
						</span>
					</li>
					<li class="flex gap-4">
						<span class="icon-chip"><Icon icon="lucide:map-pin" class="size-5" /></span>
						<span>
							<span class="block font-semibold">Address</span>
							<span class="text-muted text-sm">
								{church.address.street}<br />{church.address.city},
								{church.address.region}
								{church.address.postalCode}
							</span>
						</span>
					</li>
				</ul>
				<div class="mt-8 flex flex-wrap gap-3">
					<a href="/contact" class="btn btn-primary">Plan your visit</a>
					<a
						href={links.zoom.link}
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-outline"
					>
						<Icon icon="lucide:video" class="size-4" />
						Join on Zoom
					</a>
				</div>
			</div>
			<ChurchMap class="lg:col-span-7" />
		</section>
	</div>
</FccLayout>
