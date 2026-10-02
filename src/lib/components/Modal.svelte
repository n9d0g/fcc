<script lang="ts">
	import { getModalState, closeModal, type SermonModalData, type PraiseModalData } from '$lib/stores/modalStore.svelte'
	import SermonModal from '$lib/components/sermons/SermonModal.svelte'
	import PraiseModal from '$lib/components/ministries/praise/PraiseModal.svelte'

	const modal = getModalState()
</script>

{#if modal.isOpen}
	<!-- Backdrop -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="fixed inset-0 z-50 bg-surface-900/75" onclick={closeModal}></div>

	<!-- Modal Container -->
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4">
		{#if modal.type === 'sermon'}
			<SermonModal data={modal.data as SermonModalData} onclose={closeModal} />
		{:else if modal.type === 'praise'}
			<PraiseModal data={modal.data as PraiseModalData} onclose={closeModal} />
		{/if}
	</div>
{/if}
