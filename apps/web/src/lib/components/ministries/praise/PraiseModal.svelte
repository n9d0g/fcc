<script lang="ts">
	import { format, addDays } from 'date-fns'
	import type { PraiseModalData } from '$lib/stores/modalStore.svelte'
	import Icon from '@iconify/svelte'

	// Svelte 5 props
	let { data, onclose }: { data: PraiseModalData; onclose: () => void } = $props()

	// Derived values
	const formattedDate = $derived(
		data.date ? format(addDays(new Date(data.date), 1), 'MMMM do, yyyy') : 'Date not available'
	)
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
	class="card max-h-[90vh] w-full max-w-2xl space-y-4 overflow-y-auto bg-white dark:bg-surface-900 p-6 shadow-xl"
	onclick={(e) => e.stopPropagation()}
>
	<header class="flex items-start justify-between">
		<h2 class="text-2xl font-bold">{formattedDate}</h2>
		<button onclick={onclose} class="btn-icon text-gray-500 hover:preset-tonal hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" aria-label="Close modal">
			<Icon icon="lucide:x" class="h-5 w-5" />
		</button>
	</header>

	<div class="space-y-3">
		{#if data.speaker}
			<p><span class="font-bold">Speaker:</span> {data.speaker}</p>
		{/if}

		{#if data.title}
			<p><span class="font-bold">Title:</span> {data.title}</p>
		{/if}

		{#if data.series}
			<p><span class="font-bold">Series:</span><br /> {data.series}</p>
		{/if}

		{#if data.scripture}
			<p><span class="font-bold">Scripture:</span><br /> {data.scripture}</p>
		{/if}

		{#if data.objective}
			<p><span class="font-bold">Objective:</span><br /> {data.objective}</p>
		{/if}

		{#if data.summary}
			<p><span class="font-bold">Summary:</span><br /> {data.summary}</p>
		{/if}

		{#if data.songs && data.songs.length > 0}
			<div>
				<p class="font-bold">Songs:</p>
				<ol class="my-0 list-inside list-decimal">
					{#each data.songs as song}
						<li>{song.title} - {song.artist}</li>
					{/each}
				</ol>
			</div>
		{/if}

		{#if data.unavailableList && data.unavailableList.length > 0}
			<div>
				<p class="font-bold">Unavailable:</p>
				<div class="table-container">
					<table class="table-compact table">
						<tbody>
							{#each data.unavailableList as unavailable}
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

		{#if data.pdf}
			<a href={data.pdf} class="btn preset-filled-tertiary-500 my-4 inline-block">PDF Chords</a>
		{/if}
	</div>

	<footer class="flex justify-end pt-4">
		<button class="btn preset-filled-error-500" onclick={onclose}>Close</button>
	</footer>
</section>
