<script lang="ts">
	import FccLayout from '$lib/FccLayout.svelte'
	import PageTitle from '$lib/PageTitle.svelte'
	import { Stepper, Step } from '@skeletonlabs/skeleton'
	import type { PageData } from './$types'

	export let data: PageData
</script>

<FccLayout title="FCC | Beliefs">
	<PageTitle text="Our Beliefs" />
	<h2 class="my-10">Our Core Values</h2>
	<Stepper stepTerm="Core Value">
		{#each data.coreValues as value}
			<Step>
				<svelte:fragment slot="header">{value.title}</svelte:fragment>
				<p class="text-lg h-fit lg:h-16">
					{value.text}
				</p>
			</Step>
		{/each}
	</Stepper>
	<h2 class="my-10">Statement of Faith</h2>
	<Stepper stepTerm="Statement">
		{#each data.statementsOfFaith as statement}
			<Step>
				<svelte:fragment slot="header">{statement.title}</svelte:fragment>
				<p class="text-lg h-fit lg:h-16">
					{statement.text}
				</p>
			</Step>
		{/each}
	</Stepper>
</FccLayout>
