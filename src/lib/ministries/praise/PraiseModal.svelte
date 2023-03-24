<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton'

	export let parent: any

	// base classes
	const cCard = 'card p-4 w-modal-slim shadow-xl space-y-4'
	const cHeader = 'text-2xl font-bold'
</script>

<section class={cCard}>
	<header class={cHeader}>{$modalStore[0]?.meta[6]}</header>
	<p><span class="font-bold">Series:</span><br /> {$modalStore[0]?.meta[0]}</p>
	<p><span class="font-bold">Sermon Title:</span><br /> {$modalStore[0]?.meta[1]}</p>
	<p><span class="font-bold">Speaker:</span><br /> {$modalStore[0]?.meta[2]}</p>
	<p><span class="font-bold">Scripture:</span><br /> {$modalStore[0]?.meta[3]}</p>
	<p><span class="font-bold">Objective:</span><br /> {$modalStore[0]?.meta[4]}</p>
	<p><span class="font-bold">Summary:</span><br /> {$modalStore[0]?.meta[5]}</p>
	<footer class="modal-footer {parent.regionFooter}">
		<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>
			{parent.buttonTextCancel}
		</button>
	</footer>
</section>
