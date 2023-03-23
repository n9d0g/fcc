<script lang="ts">
	import { Modal, modalStore } from '@skeletonlabs/skeleton'
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton'

	export let title: string
	export let date: string
	export let speaker: string

	const alert: ModalSettings = {
		type: 'alert',
		title: title,
		body: speaker
	}

	const handleSermonClick = () => {
		modalStore.trigger(alert)
	}
</script>

<button
	on:click={handleSermonClick}
	class="card card-hover flex flex-col justify-start items-start p-4"
>
	<header class="card-header">{title}</header>
	<section class="p-4">{date}</section>
	<footer class="card-footer">{speaker}</footer>
</button>

<Modal />
