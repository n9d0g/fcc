<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton'
	import { sermonModalSettings } from '$lib/utils'

	export let title: string
	export let date: string
	export let speaker: string
	export let scripture: string
	export let youtube: string
	export let thumb: string

	const handleSermonClick = () => {
		const setting = sermonModalSettings(title, date, speaker, scripture, youtube)
		modalStore.trigger(setting)
	}
</script>

<button
	on:click={handleSermonClick}
	class="card card-hover flex flex-col justify-start items-start"
>
	<img src={thumb} alt="{title} Image" class="w-full rounded-t-lg" />
	<header class="card-header font-bold text-start">{title}</header>
	<section class="flex flex-col justify-start items-start gap-4 p-4">
		<p class="text-start">{speaker}</p>
	</section>
	<footer class="card-footer text-start">{date}</footer>
</button>
