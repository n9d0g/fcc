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
		body: `${speaker} <br/><br/> ${scripture} <br/><br/> ${youtube}`
	}

	const handleSermonClick = () => {
		modalStore.trigger(alert)
	}
</script>

<button
	on:click={handleSermonClick}
	class="card card-hover flex flex-col justify-start items-start p-4"
>
	<header class="card-header font-bold">{title}</header>
	<section class="flex flex-col justify-start items-start gap-4 p-4">
		<p class="text-start">{speaker}</p>
		<p class="text-start">{scripture}</p>
		<p class="text-start">{youtube}</p>
	</section>
	<footer class="card-footer">{date}</footer>
</button>

<Modal />
