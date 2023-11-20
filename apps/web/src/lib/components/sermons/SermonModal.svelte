<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton'
	import { getMonthDayFull } from '$lib/utils'
	import Youtube from 'svelte-youtube-embed'

	// props
	export let parent: any

	// variables
	const modalStore = getModalStore()

	const metaData = {
		title: $modalStore[0]?.meta.title,
		speaker: $modalStore[0]?.meta.speaker,
		scripture: $modalStore[0]?.meta.scripture,
		youtube: $modalStore[0]?.meta.youtube.replace(
			'https://www.youtube.com/watch?v=',
			''
		),
		date: $modalStore[0]?.meta.date,
	}

	// base classes
	const cCard = 'card p-4 w-modal shadow-xl space-y-4 min-h-fit'
	const cHeader = 'text-2xl font-bold'
</script>

<section class={cCard}>
	<header class={cHeader}>{metaData.title}</header>

	<p><span class="font-bold">Speaker:</span> {metaData.speaker}</p>
	<p><span class="font-bold">Scripture:</span> {metaData.scripture}</p>
	<p class="pb-8">
		<span class="font-bold">Date:</span>{' '}{getMonthDayFull(metaData.date)}
	</p>
	<Youtube
		id={metaData.youtube}
		--title-color="transparent"
		--title-shadow-color="transparent"
	/>

	<footer class="modal-footer {parent.regionFooter}">
		<button class="variant-filled-error btn" on:click={parent.onClose}>
			Close
		</button>
	</footer>
</section>
