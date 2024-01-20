<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton'
	import { getMonthDayFull, sermonModalSettings } from '$lib/utils'

	export let title: string
	export let date: string
	export let speaker: string
	export let scripture: string
	export let youtube: string

	const youtubeId = youtube.replace('https://www.youtube.com/watch?v=', '')
	const thumbImg = `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`

	const modalStore = getModalStore()

	const handleSermonClick = () => {
		const setting = sermonModalSettings(
			title,
			date,
			speaker,
			scripture,
			youtube
		)

		modalStore.trigger(setting)
	}
</script>

<button
	on:click={handleSermonClick}
	class="card card-hover flex flex-col items-start justify-between"
>
	<div>
		<img src={thumbImg} alt="{title} Image" class="w-full rounded-t-lg" />
		<header class="card-header text-start text-2xl font-bold">{title}</header>
		<section
			class="flex flex-col items-start justify-start gap-4 px-4 pb-1 pt-3"
		>
			<p class="text-start text-sm">{speaker}</p>
		</section>
	</div>
	<footer class="card-footer text-start text-sm">
		{getMonthDayFull(date)}
	</footer>
</button>
