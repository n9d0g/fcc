<script lang="ts">
	import Icon from '@iconify/svelte'

	// Svelte 5 props
	let {
		page = $bindable(0),
		pageSize = 16,
		totalItems,
		class: className = '',
	}: {
		page?: number
		pageSize?: number
		totalItems: number
		class?: string
	} = $props()

	// Derived values
	let totalPages = $derived(Math.ceil(totalItems / pageSize))
	let canGoPrev = $derived(page > 0)
	let canGoNext = $derived(page < totalPages - 1)

	const goToFirst = () => {
		page = 0
	}

	const goToPrev = () => {
		if (canGoPrev) page--
	}

	const goToNext = () => {
		if (canGoNext) page++
	}

	const goToLast = () => {
		page = totalPages - 1
	}
</script>

<div class="flex items-center justify-center gap-2 {className}">
	<button
		onclick={goToFirst}
		disabled={!canGoPrev}
		class="btn-icon preset-tonal disabled:opacity-50"
		aria-label="First page"
	>
		<Icon icon="lucide:chevrons-left" class="h-4 w-4" />
	</button>
	<button
		onclick={goToPrev}
		disabled={!canGoPrev}
		class="btn-icon preset-tonal disabled:opacity-50"
		aria-label="Previous page"
	>
		<Icon icon="lucide:chevron-left" class="h-4 w-4" />
	</button>

	<span class="px-4 text-sm">
		Page {page + 1} of {totalPages}
	</span>

	<button
		onclick={goToNext}
		disabled={!canGoNext}
		class="btn-icon preset-tonal disabled:opacity-50"
		aria-label="Next page"
	>
		<Icon icon="lucide:chevron-right" class="h-4 w-4" />
	</button>
	<button
		onclick={goToLast}
		disabled={!canGoNext}
		class="btn-icon preset-tonal disabled:opacity-50"
		aria-label="Last page"
	>
		<Icon icon="lucide:chevrons-right" class="h-4 w-4" />
	</button>
</div>
