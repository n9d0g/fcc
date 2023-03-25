<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton'

	// props
	export let parent: any

	// base classes
	const cCard = 'card p-4 w-modal shadow-xl space-y-4 min-h-fit'
	const cHeader = 'text-2xl font-bold'
</script>

<section class={cCard}>
	<header class={cHeader}>{$modalStore[0]?.meta.title} - {$modalStore[0]?.meta.date}</header>
	<p>{$modalStore[0]?.meta.speaker}</p>
	<p>{$modalStore[0]?.meta.scripture}</p>
	<footer class="modal-footer {parent.regionFooter}">
		<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>
			{parent.buttonTextCancel}
		</button>
	</footer>
</section>
