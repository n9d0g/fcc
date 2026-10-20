<script lang="ts">
	import { formatCmsDate, getYoutubeId } from '#lib/utils.js'
	import type { SermonModalData } from '#lib/stores/modalStore.svelte.js'
	import Icon from '@iconify/svelte'

	// Svelte 5 props
	let { data, onclose }: { data: SermonModalData; onclose: () => void } = $props()

	// Derived values
	const youtubeId = $derived(getYoutubeId(data.youtube))
	const formattedDate = $derived(formatCmsDate(data.date))
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
	class="card w-full max-w-3xl space-y-5 p-6 shadow-2xl md:p-8"
	onclick={(e) => e.stopPropagation()}
>
	<header class="flex items-start justify-between">
		<h2 class="h3">{data.title}</h2>
		<button onclick={onclose} class="btn-icon -mt-1 -mr-1 text-muted hover:bg-surface-100 hover:text-ink" aria-label="Close modal">
			<Icon icon="lucide:x" class="h-5 w-5" />
		</button>
	</header>

	<dl class="flex flex-wrap gap-x-8 gap-y-3 text-sm">
		<div>
			<dt class="eyebrow">Speaker</dt>
			<dd class="mt-1 font-medium">{data.speaker}</dd>
		</div>
		<div>
			<dt class="eyebrow">Scripture</dt>
			<dd class="mt-1 font-medium">{data.scripture}</dd>
		</div>
		<div>
			<dt class="eyebrow">Date</dt>
			<dd class="mt-1 font-medium">{formattedDate}</dd>
		</div>
	</dl>

	<div class="overflow-hidden rounded-2xl">
		<iframe
			class="aspect-video w-full"
			src="https://www.youtube-nocookie.com/embed/{youtubeId}?autoplay=1&rel=0"
			title={data.title}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>
	</div>

	<footer class="flex justify-end">
		<button class="btn btn-outline" onclick={onclose}>Close</button>
	</footer>
</section>
