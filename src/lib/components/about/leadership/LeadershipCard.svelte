<script lang="ts">
	// imports
	import { Avatar, popup, type PopupSettings } from '@skeletonlabs/skeleton'

	// props
	export let name: string
	export let title: string
	export let img: string
	export let subministries: any

	let popupSettings: PopupSettings = {
		event: 'hover',
		target: 'leaderDetails',
		placement: 'top',
	}
</script>

<div class="card card-hover flex h-64 items-center px-4 py-8" use:popup={popupSettings}>
	<Avatar src={img} width="w-32" height="h-32" rounded="rounded-full" />
	<div class="flex flex-col">
		<h4 class="card-header">{name}</h4>
		<h5 class="card-footer">{title}</h5>
	</div>
	<div class="card variant-filled-surface p-4" data-popup="leaderDetails">
		{#if subministries}
			{#each subministries as subministry}
				<h6>{subministry.name}</h6>
				<p>{subministry.ministry}</p>
			{/each}
		{/if}
		<span class="arrow variant-filled-surface" />
	</div>
</div>
