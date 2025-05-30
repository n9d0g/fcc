<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton'
	import { format, addDays } from 'date-fns'

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
		songs: $modalStore[0]?.meta.songs,
		pdf: $modalStore[0]?.meta.pdf,
		unavailableList: $modalStore[0]?.meta.unavailableList,
	}

	console.log(metaData.unavailableList)

	const estDate = addDays(new Date(metaData.date), 1)
	const date = format(estDate, 'MMMM do, yyyy')

	// base classes
	const cCard = 'flex flex-col card p-4 w-modal shadow-xl space-y-4 min-h-fit'
	const cHeader = 'text-2xl font-bold'
	const cChords = 'anchor btn variant-filled-tertiary my-4'
</script>

<section class={cCard}>
	<header class={cHeader}>{date}</header>
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

	{#if metaData.songs}
		<div>
			<p class="font-bold">Songs:</p>
			<ol class="my-0 list-inside list-decimal">
				{#each metaData.songs as song}
					<li>{song.title} - {song.artist}</li>
				{/each}
			</ol>
		</div>
	{/if}

	{#if metaData.unavailableList}
		<div>
			<p class="font-bold">Unavailable:</p>
			<div class="table-container">
				<table class="table-compact table">
					<tbody>
						{#each metaData.unavailableList as unavailable}
							<tr>
								<td class="table-cell-fit">{unavailable.name}</td>
								<td class="table-cell-fit">{unavailable.reason}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
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
