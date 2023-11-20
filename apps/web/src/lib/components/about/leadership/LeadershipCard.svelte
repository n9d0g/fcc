<script lang="ts">
	// imports
	import { Avatar, popup, type PopupSettings } from '@skeletonlabs/skeleton'

	// props
	export let name: string
	export let title: string
	export let img: string
	export let sort: number
	export let subministries: any

	let cardTarget = `leaderDeatils-${sort}`

	let popupSettings: PopupSettings = {
		event: 'click',
		target: cardTarget,
		placement: 'top',
	}
</script>

<div class="card card-hover flex h-64 items-center px-4 py-8">
	<Avatar src={img} width="w-32" height="h-32" rounded="rounded-full" />
	<div class="flex flex-col">
		<h4 class="h4 card-header font-bold">{name}</h4>
		<p class="card-footer italic">{title}</p>
		<!-- {#if subministries !== null}
			<button use:popup={popupSettings} type="button" class="btn variant-filled cursor-pointer">Sub-Ministries</button>
		{/if} -->
	</div>
</div>

{#if subministries !== null}
	<div class="card variant-filled-surface z-40 p-4" data-popup={cardTarget}>
		{#each subministries as subministry}
			<article class="flex gap-2">
				<h6 class="h6 font-bold">{subministry.name}:</h6>
				<p>{subministry.ministry}</p>
			</article>
		{/each}
		<span class="variant-filled-surface arrow" />
	</div>
{/if}
