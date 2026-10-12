<script lang="ts">
	import Icon from '@iconify/svelte'

	export interface LandingPageItem {
		title: string
		link: string
		external?: boolean
		/** Photo for the card; cards without one get a branded tile */
		image?: string
		description?: string
		icon?: string
	}

	// Svelte 5 props
	let { items }: { items: LandingPageItem[] } = $props()
</script>

<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
	{#each items as card}
		<a
			href={card.link}
			target={card.external ? '_blank' : '_self'}
			rel={card.external ? 'noopener noreferrer' : undefined}
			class="group relative isolate flex flex-col justify-end overflow-hidden rounded-3xl p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift {card.image
				? 'min-h-60 bg-primary-900 text-white md:min-h-72'
				: 'min-h-48 border border-line bg-white md:min-h-56'}"
			data-sveltekit-preload-data="hover"
		>
			{#if card.image}
				<img
					src={card.image}
					alt=""
					loading="lazy"
					class="absolute inset-0 -z-10 size-full object-cover transition-transform duration-700 group-hover:scale-105"
				/>
				<div
					class="absolute inset-0 -z-10 bg-gradient-to-t from-primary-950/90 via-primary-950/35 to-primary-950/5"
				></div>
			{:else}
				<div
					class="absolute -top-16 -right-16 -z-10 size-48 rounded-full bg-secondary-100 transition-transform duration-500 group-hover:scale-110"
					aria-hidden="true"
				></div>
				<span class="icon-chip absolute top-6 left-6 bg-white">
					<Icon icon={card.icon ?? 'lucide:sparkles'} class="size-5" />
				</span>
			{/if}

			<div class="flex items-end justify-between gap-4">
				<div>
					<h2
						class="font-display text-2xl font-semibold {card.image
							? 'text-white'
							: 'text-ink'}"
					>
						{card.title}
					</h2>
					{#if card.description}
						<p class="mt-2 text-sm {card.image ? 'text-white/80' : 'text-muted'}">
							{card.description}
						</p>
					{/if}
				</div>
				<span
					class="flex size-10 shrink-0 items-center justify-center rounded-full transition {card.image
						? 'bg-white/15 text-white backdrop-blur-sm group-hover:bg-white group-hover:text-primary-800'
						: 'bg-primary-50 text-primary-700 group-hover:bg-primary-700 group-hover:text-white'}"
				>
					<Icon
						icon={card.external ? 'lucide:arrow-up-right' : 'lucide:arrow-right'}
						class="size-4"
					/>
				</span>
			</div>
		</a>
	{/each}
</div>
