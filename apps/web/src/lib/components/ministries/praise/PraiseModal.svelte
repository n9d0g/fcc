<script lang="ts">
	import { getMonthDayFull } from '$lib/utils'
	import { getModalStore } from '@skeletonlabs/skeleton'

	export let parent: any

	const modalStore = getModalStore()

	const metaData = {
		date: $modalStore[0]?.meta.date,
		speaker: $modalStore[0]?.meta.speaker,
		title: $modalStore[0]?.meta.title,
		series: $modalStore[0]?.meta.series,
		scripture: $modalStore[0]?.meta.scripture,
		objective: $modalStore[0]?.meta.objective,
		summary: $modalStore[0]?.meta.summary,
		pdf: $modalStore[0]?.meta.pdf,
	}

	// base classes
	const cCard = 'flex flex-col card p-4 w-modal shadow-xl space-y-4 min-h-fit'
	const cHeader = 'text-2xl font-bold'
	const cChords = 'anchor btn variant-filled-tertiary my-4'
</script>

<section class={cCard}>
	<header class={cHeader}>{getMonthDayFull(metaData.date)}</header>
	{#if metaData.speaker}
		<p><span class="font-bold">Speaker:</span> {metaData.speaker}</p>
	{/if}

	{#if metaData.title}
		<p><span class="font-bold">Title:</span> {metaData.title}</p>
	{/if}

	{#if metaData.series}
		<p><span class="font-bold">Series:</span><br /> {metaData.series}</p>
	{/if}

	{#if metaData.scripture}
		<p><span class="font-bold">Scripture:</span><br /> {metaData.scripture}</p>
	{/if}

	{#if metaData.objective}
		<p><span class="font-bold">Objective:</span><br /> {metaData.objective}</p>
	{/if}

	{#if metaData.summary}
		<p><span class="font-bold">Summary:</span><br /> {metaData.summary}</p>
	{/if}

	{#if metaData.pdf}
		<a href={metaData.pdf} class={cChords}> PDF Chords </a>
	{/if}
	<footer class="modal-footer {parent.regionFooter}">
		<button class="variant-filled-error btn" on:click={parent.onClose}>
			Close
		</button>
	</footer>
</section>
