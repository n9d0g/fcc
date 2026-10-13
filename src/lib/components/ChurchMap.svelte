<script lang="ts">
	import Icon from '@iconify/svelte'
	import { church, links } from '#lib/config/index.js'

	// Google Maps embed of the church's address. The `output=embed` form needs
	// no API key. Loads lazily, so it costs nothing until it scrolls into view.
	let { class: className = '' }: { class?: string } = $props()

	const { street, city, region, postalCode } = church.address
	const address = `${street}, ${city}, ${region} ${postalCode}`
	const src = `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`
</script>

<figure class="card flex flex-col overflow-hidden p-0 {className}">
	<iframe
		title="Map showing Freedom in Christ Church at {address}"
		{src}
		class="block min-h-72 w-full flex-1 border-0 md:min-h-80"
		loading="lazy"
		referrerpolicy="no-referrer-when-downgrade"
		allowfullscreen
	></iframe>
	<figcaption
		class="flex flex-col gap-3 border-t border-line p-4 sm:flex-row sm:items-center sm:justify-between"
	>
		<span class="flex items-start gap-2 text-sm">
			<Icon icon="lucide:map-pin" class="mt-0.5 size-4 shrink-0 text-secondary-600" />
			{address}
		</span>
		<a
			href={links.googleMaps}
			target="_blank"
			rel="noopener noreferrer"
			class="btn btn-sm btn-outline shrink-0"
		>
			<Icon icon="lucide:navigation" class="size-4" />
			Get directions
		</a>
	</figcaption>
</figure>
