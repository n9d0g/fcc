<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton'
	import Youtube from 'svelte-youtube-embed'

	// props
	export let parent: any

	let youtubeId = $modalStore[0]?.meta.youtube.replace('https://www.youtube.com/watch?v=', '')

	// base classes
	const cCard = 'card p-4 w-modal shadow-xl space-y-4 min-h-fit'
	const cHeader = 'text-2xl font-bold'
</script>

<section class={cCard}>
	<header class={cHeader}>{$modalStore[0]?.meta.title} - {$modalStore[0]?.meta.date}</header>

	<p><span class="font-bold">Speaker:</span> {$modalStore[0]?.meta.speaker}</p>
	<p class="pb-8"><span class="font-bold">Scripture:</span> {$modalStore[0]?.meta.scripture}</p>
	<Youtube id={youtubeId} --title-color="transparent" --title-shadow-color="transparent" />

	<footer class="modal-footer {parent.regionFooter}">
		<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>
			{parent.buttonTextCancel}
		</button>
	</footer>
</section>
