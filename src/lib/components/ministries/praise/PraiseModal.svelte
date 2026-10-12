<script lang="ts">
	import { formatCmsDate } from '#lib/utils.js'
	import type { PraiseModalData } from '#lib/stores/modalStore.svelte.js'
	import Icon from '@iconify/svelte'

	// Svelte 5 props
	let { data, onclose }: { data: PraiseModalData; onclose: () => void } = $props()

	// Derived values
	const formattedDate = $derived(formatCmsDate(data.date))
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
	class="card max-h-[90vh] w-full max-w-2xl space-y-5 overflow-y-auto p-6 shadow-2xl md:p-8"
	onclick={(e) => e.stopPropagation()}
>
	<header class="flex items-start justify-between">
		<h2 class="h3">{formattedDate}</h2>
		<button onclick={onclose} class="btn-icon -mt-1 -mr-1 text-muted hover:bg-surface-100 hover:text-ink" aria-label="Close modal">
			<Icon icon="lucide:x" class="h-5 w-5" />
		</button>
	</header>

	<div class="space-y-3">
		{#if data.speaker}
			<p><span class="font-semibold text-secondary-700">Speaker:</span> {data.speaker}</p>
		{/if}

		{#if data.title}
			<p><span class="font-semibold text-secondary-700">Title:</span> {data.title}</p>
		{/if}

		{#if data.series}
			<p><span class="font-semibold text-secondary-700">Series:</span><br /> {data.series}</p>
		{/if}

		{#if data.scripture}
			<p><span class="font-semibold text-secondary-700">Scripture:</span><br /> {data.scripture}</p>
		{/if}

		{#if data.objective}
			<p><span class="font-semibold text-secondary-700">Objective:</span><br /> {data.objective}</p>
		{/if}

		{#if data.summary}
			<p><span class="font-semibold text-secondary-700">Summary:</span><br /> {data.summary}</p>
		{/if}

		{#if data.songs && data.songs.length > 0}
			<div>
				<p class="font-semibold text-secondary-700">Songs:</p>
				<ol class="my-0 list-inside list-decimal">
					{#each data.songs as song}
						<li>{song.title} - {song.artist}</li>
					{/each}
				</ol>
			</div>
		{/if}

		{#if data.unavailableList && data.unavailableList.length > 0}
			<div>
				<p class="font-semibold text-secondary-700">Unavailable:</p>
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
			<a href={data.pdf} class="btn btn-secondary">PDF Chords</a>
		{/if}
	</div>

	<footer class="flex justify-end">
		<button class="btn btn-outline" onclick={onclose}>Close</button>
	</footer>
</section>
