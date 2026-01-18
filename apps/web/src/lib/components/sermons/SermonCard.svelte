<script lang="ts">
	import { format, addDays } from 'date-fns'
	import { openSermonModal } from '$lib/stores/modalStore.svelte'

	// Svelte 5 props
	let {
		title,
		date,
		speaker,
		scripture,
		youtube,
	}: {
		title: string
		date: string
		speaker: string
		scripture: string
		youtube: string
	} = $props()

	// Derived values
	const youtubeId = $derived(
		youtube.replace('https://www.youtube.com/watch?v=', '')
	)
	const thumbImg = $derived(
		`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`
	)
	const formattedDate = $derived(
		date
			? format(addDays(new Date(date), 1), 'MMMM do, yyyy')
			: 'Date not available'
	)

	const handleSermonClick = () => {
		openSermonModal({ title, date, speaker, scripture, youtube })
	}
</script>

<button
	onclick={handleSermonClick}
	class="card flex cursor-pointer flex-col items-start justify-between transition-shadow hover:shadow-lg"
>
	<div>
		<img src={thumbImg} alt="{title} Image" class="w-full rounded-t-lg" />
		<header class="card-header text-start text-2xl font-bold">{title}</header>
		<section
			class="flex flex-col items-start justify-start gap-4 px-4 pt-3 pb-1"
		>
			<p class="text-start text-sm">{speaker}</p>
		</section>
	</div>
	<footer class="card-footer text-start text-sm">
		{formattedDate}
	</footer>
</button>
