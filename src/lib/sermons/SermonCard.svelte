<script lang="ts">
	import { Modal, modalStore } from '@skeletonlabs/skeleton'
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton'

	export let title: string
	export let date: string
	export let speaker: string
	export let scripture: string
	export let youtube: string

	const alert: ModalSettings = {
		type: 'alert',
		title: title,
		body: `${speaker} <br/><br/> ${scripture} <br/><br/> 🚧 <a href="${youtube}" target="_blank" class="text-start">youtube link here</a>, youtube video embed WIP 🚧`
	}

	const handleSermonClick = () => {
		modalStore.trigger(alert)
	}
</script>

<button
	on:click={handleSermonClick}
	class="card card-hover flex flex-col justify-start items-start p-4"
>
	<header class="card-header font-bold text-start">{title}</header>
	<section class="flex flex-col justify-start items-start gap-4 p-4">
		<p class="text-start">{speaker}</p>
	</section>
	<footer class="card-footer text-start">{date}</footer>
</button>

<Modal />
