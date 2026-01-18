<script lang="ts">
	import { goto } from '$app/navigation'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import Icon from '@iconify/svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let headData = $derived(data.headData)
	let breadcrumb = $derived(data.breadcrumb)
	let coreValues = $derived(data.coreValues)
	let statementsOfFaith = $derived(data.statementsOfFaith)

	// Accordion state
	let openCoreValue = $state<number | null>(0)
	let openStatement = $state<number | null>(0)

	const toggleCoreValue = (index: number) => {
		openCoreValue = openCoreValue === index ? null : index
	}

	const toggleStatement = (index: number) => {
		openStatement = openStatement === index ? null : index
	}

	const handleComplete = () => {
		goto('/about')
	}
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<!-- Core Values -->
	<section class="mb-12">
		<h2 class="h2 mb-6 font-bold">Our Core Values</h2>
		<div class="space-y-2">
			{#each coreValues as value, index}
				<div class="card overflow-hidden">
					<button
						onclick={() => toggleCoreValue(index)}
						class="hover:bg-gray-100 dark:hover:bg-surface-800 flex w-full items-center justify-between p-4 text-left transition-colors"
					>
						<span class="font-semibold">{value.title}</span>
						<Icon
							icon="lucide:chevron-down"
							class="h-5 w-5 transition-transform {openCoreValue === index
								? 'rotate-180'
								: ''}"
						/>
					</button>
					{#if openCoreValue === index}
						<div class="border-gray-200 dark:border-surface-700 bg-white dark:bg-surface-900 border-t p-4">
							<p class="text-lg">{value.text}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- Statement of Faith -->
	<section class="mb-12">
		<h2 class="h2 mb-6 font-bold">Statement of Faith</h2>
		<div class="space-y-2">
			{#each statementsOfFaith as statement, index}
				<div class="card overflow-hidden">
					<button
						onclick={() => toggleStatement(index)}
						class="hover:bg-gray-100 dark:hover:bg-surface-800 flex w-full items-center justify-between p-4 text-left transition-colors"
					>
						<span class="font-semibold">{statement.title}</span>
						<Icon
							icon="lucide:chevron-down"
							class="h-5 w-5 transition-transform {openStatement === index
								? 'rotate-180'
								: ''}"
						/>
					</button>
					{#if openStatement === index}
						<div class="border-gray-200 dark:border-surface-700 bg-white dark:bg-surface-900 border-t p-4">
							<p class="text-lg">{statement.text}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- Back button -->
	<div class="flex justify-center">
		<button onclick={handleComplete} class="btn preset-filled-secondary-500">
			Go back to About page
		</button>
	</div>
</FccLayout>
