<script>
	import { Stepper, Step } from '@skeletonlabs/skeleton'
</script>

<svelte:head>
	<title>FCC | Mission & Vision</title>
</svelte:head>

<section class="container mx-auto flex flex-col h-screen">
	<h1 class="flex justify-center">mission vision page</h1>
	<Stepper>
		<Step>
			<svelte:fragment slot="header">(header)</svelte:fragment>
			(content)
		</Step>
		<Step>
			<svelte:fragment slot="header">(header)</svelte:fragment>
			(content)
		</Step>
	</Stepper>
</section>
