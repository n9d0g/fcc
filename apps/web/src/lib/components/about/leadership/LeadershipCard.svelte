<script lang="ts">
	// Svelte 5 props
	let {
		name,
		title,
		img,
		sort,
		subministries,
	}: {
		name: string
		title: string
		img: string
		sort: number
		subministries: Array<{ name: string; ministry: string }> | null
	} = $props()

	// State for popup
	let showPopup = $state(false)
</script>

<div class="card flex h-64 items-center px-4 py-8 transition-shadow hover:shadow-lg">
	<img src={img} alt={name} class="h-32 w-32 rounded-full object-cover" />
	<div class="ml-4 flex flex-col">
		<h4 class="h4 font-bold">{name}</h4>
		<p class="italic text-surface-600 dark:text-surface-400">{title}</p>
		{#if subministries !== null && subministries.length > 0}
			<div class="relative mt-2">
				<button
					type="button"
					class="btn btn-sm preset-tonal cursor-pointer"
					onclick={() => (showPopup = !showPopup)}
				>
					Sub-Ministries
				</button>
				{#if showPopup}
					<div
						class="card preset-filled-surface-500 absolute bottom-full left-0 z-40 mb-2 p-4 shadow-lg"
					>
						{#each subministries as subministry}
							<article class="flex gap-2">
								<h6 class="h6 font-bold">{subministry.name}:</h6>
								<p>{subministry.ministry}</p>
							</article>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
