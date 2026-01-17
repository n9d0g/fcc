<script lang="ts">
	import Youtube from 'svelte-youtube-embed'
	import { format, addDays } from 'date-fns'
	import type { SermonModalData } from '$lib/stores/modalStore.svelte'
	import Icon from '@iconify/svelte'

	// Svelte 5 props
	let { data, onclose }: { data: SermonModalData; onclose: () => void } = $props()

	// Derived values
	const youtubeId = $derived(data.youtube.replace('https://www.youtube.com/watch?v=', ''))
	const formattedDate = $derived(
		data.date ? format(addDays(new Date(data.date), 1), 'MMMM do, yyyy') : 'Date not available'
	)
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
	class="card w-full max-w-2xl space-y-4 bg-surface-100-900 p-6 shadow-xl"
	onclick={(e) => e.stopPropagation()}
>
	<header class="flex items-start justify-between">
		<h2 class="text-2xl font-bold">{data.title}</h2>
		<button onclick={onclose} class="btn-icon text-gray-500 hover:preset-tonal hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" aria-label="Close modal">
			<Icon icon="lucide:x" class="h-5 w-5" />
		</button>
	</header>

	<div class="space-y-2">
		<p><span class="font-bold">Speaker:</span> {data.speaker}</p>
		<p><span class="font-bold">Scripture:</span> {data.scripture}</p>
		<p><span class="font-bold">Date:</span> {formattedDate}</p>
	</div>

	<div class="pt-4">
		<Youtube id={youtubeId} --title-color="transparent" --title-shadow-color="transparent" />
	</div>

	<footer class="flex justify-end pt-4">
		<button class="btn preset-filled-error-500" onclick={onclose}>Close</button>
	</footer>
</section>
