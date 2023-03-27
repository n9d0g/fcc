<script lang="ts">
	import { Modal, modalStore } from '@skeletonlabs/skeleton'
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton'
	import SermonModal from '$lib/sermons/SermonModal.svelte'

	export let title: string
	export let date: string
	export let speaker: string
	export let scripture: string
	export let youtube: string
	export let thumb: string

	const modalComponentRegistry: Record<string, ModalComponent> = {
		modalComponentOne: {
			ref: SermonModal,
		},
	}

	const handleSermonClick = () => {
		const alert: ModalSettings = {
			type: 'component',
			component: 'modalComponentOne',
			meta: {
				title: title,
				date: date,
				speaker: speaker,
				scripture: scripture,
				youtube: youtube,
			},
		}

		modalStore.trigger(alert)
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

<Modal components={modalComponentRegistry} />
