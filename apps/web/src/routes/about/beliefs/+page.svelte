<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import { Stepper, Step } from '@skeletonlabs/skeleton'

	export let data

	const title = data.title
	const breadcrumb = data.breadcrumb
	const headData = data.headData
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<h2 class="h2 my-10">Our Core Values</h2>

	<!-- core values -->
	<Stepper stepTerm="Core Value">
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
	<Stepper stepTerm="Statement">
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
