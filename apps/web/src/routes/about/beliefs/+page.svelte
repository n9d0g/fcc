<script lang="ts">
	import { goto } from '$app/navigation'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import { Stepper, Step } from '@skeletonlabs/skeleton'

	export let data
	const { title, headData, breadcrumb } = data

	const handleComplete = (e: any) => {
		goto('/about')
	}
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<h2 class="h2 my-10">Our Core Values</h2>

	<!-- core values -->
	<Stepper
		stepTerm="Core Value"
		buttonComplete="variant-filled-secondary"
		buttonCompleteLabel="Go back to About page"
		on:complete={handleComplete}
	>
		{#each data.coreValues as value}
			<Step>
				<svelte:fragment slot="header">{value.title}</svelte:fragment>
				<p class="h-fit text-lg lg:h-16">
					{value.text}
				</p>
			</Step>
		{/each}
	</Stepper>

	<!-- statement of faith -->
	<h2 class="h2 my-10">Statement of Faith</h2>
	<Stepper
		stepTerm="Statement"
		buttonComplete="variant-filled-secondary"
		buttonCompleteLabel="Go back to About page"
		on:complete={handleComplete}
	>
		{#each data.statementsOfFaith as statement}
			<Step>
				<svelte:fragment slot="header">{statement.title}</svelte:fragment>
				<p class="h-fit text-lg lg:h-16">
					{statement.text}
				</p>
			</Step>
		{/each}
	</Stepper>
</FccLayout>
