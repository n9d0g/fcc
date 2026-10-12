<script lang="ts">
	import { goto } from '$app/navigation'
	import FccLayout from '#lib/components/FccLayout.svelte'
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

{#snippet accordion(
	items: Array<{ title: string; text: string }>,
	open: number | null,
	toggle: (_index: number) => void
)}
	<div class="card divide-y divide-line overflow-hidden">
		{#each items as item, index}
			<div>
				<button
					onclick={() => toggle(index)}
					aria-expanded={open === index}
					class="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-paper"
				>
					<span class="font-semibold">{item.title}</span>
					<span
						class="flex size-8 shrink-0 items-center justify-center rounded-full transition {open ===
						index
							? 'rotate-180 bg-primary-700 text-white'
							: 'bg-surface-100'}"
					>
						<Icon icon="lucide:chevron-down" class="size-4" />
					</span>
				</button>
				{#if open === index}
					<div class="px-6 pb-6">
						<p class="text-lg leading-relaxed text-muted">{item.text}</p>
					</div>
				{/if}
			</div>
		{/each}
	</div>
{/snippet}

<FccLayout
	{title}
	{breadcrumb}
	{headData}
	intro="The convictions that shape how we worship, serve and live together."
>
	<div class="grid gap-14 lg:grid-cols-12">
		<div class="lg:col-span-4">
			<div class="lg:sticky lg:top-28">
				<p class="eyebrow">What we believe</p>
				<p class="lede mt-3">
					Our core values describe the kind of church we want to be. Our statement
					of faith summarizes the truths we hold in common.
				</p>
				<button onclick={handleComplete} class="btn btn-outline mt-6">
					<Icon icon="lucide:arrow-left" class="size-4" />
					Back to About
				</button>
			</div>
		</div>

		<div class="space-y-14 lg:col-span-8">
			<section>
				<h2 class="h2 mb-6">Our Core Values</h2>
				{@render accordion(coreValues, openCoreValue, toggleCoreValue)}
			</section>

			<section>
				<h2 class="h2 mb-6">Statement of Faith</h2>
				{@render accordion(statementsOfFaith, openStatement, toggleStatement)}
			</section>
		</div>
	</div>
</FccLayout>
