<script lang="ts">
	import Icon from '@iconify/svelte'

	// Svelte 5 props
	let {
		name,
		title,
		img,
		subministries,
	}: {
		name: string
		title: string
		img: string
		subministries: Array<{ name: string; ministry: string }> | null
	} = $props()

	// State for popup
	let showPopup = $state(false)
</script>

<div class="card card-hover flex flex-col items-center p-8 text-center">
	<div class="rounded-full bg-gradient-to-br from-secondary-200 to-tertiary-100 p-1.5">
		<img
			src={img}
			alt={name}
			loading="lazy"
			class="size-36 rounded-full border-4 border-white object-cover"
		/>
	</div>
	<h3 class="h4 mt-5">{name}</h3>
	<p class="mt-1 text-sm font-medium text-secondary-700">{title}</p>
	{#if subministries !== null && subministries.length > 0}
		<div class="relative mt-5">
			<button
				type="button"
				class="btn btn-sm btn-outline"
				aria-expanded={showPopup}
				onclick={() => (showPopup = !showPopup)}
			>
				Sub-ministries
				<Icon
					icon="lucide:chevron-down"
					class="size-3.5 transition-transform {showPopup ? 'rotate-180' : ''}"
				/>
			</button>
			{#if showPopup}
				<div
					class="card absolute bottom-full left-1/2 z-40 mb-2 w-64 -translate-x-1/2 space-y-2 p-4 text-left shadow-lift"
				>
					{#each subministries as subministry}
						<p class="text-sm">
							<span class="font-semibold">{subministry.name}:</span>
							<span class="text-muted">{subministry.ministry}</span>
						</p>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
