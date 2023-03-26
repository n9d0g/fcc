<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton'

	export let parent: any

	const metaData = {
		date: $modalStore[0]?.meta[6],
		speaker: $modalStore[0]?.meta[2],
		title: $modalStore[0]?.meta[1],
		series: $modalStore[0]?.meta[0],
		scripture: $modalStore[0]?.meta[3],
		objective: $modalStore[0]?.meta[4],
		summary: $modalStore[0]?.meta[5],
		pdf: $modalStore[0]?.meta[7]
	}

	// base classes
	const cCard = 'flex flex-col card p-4 w-modal shadow-xl space-y-4 min-h-screen md:min-h-fit'
	const cHeader = 'text-2xl font-bold'
	const cChords = 'btn variant-filled-tertiary my-4'

	console.log(parent)
</script>

<section class={cCard}>
	<header class={cHeader}>{metaData.date}</header>
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
		<button class="btn variant-filled-primary" on:click={parent.onClose}> Close </button>
	</footer>
</section>
