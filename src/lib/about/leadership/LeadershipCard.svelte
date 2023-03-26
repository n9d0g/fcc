<script lang="ts">
	// imports
	import { Avatar, popup, type PopupSettings } from '@skeletonlabs/skeleton'

	// props
	export let name: string
	export let title: string
	export let img: string

	let popupSettings: PopupSettings = {
		event: 'hover',
		target: 'leaderDetails',
		placement: 'top',
	}
</script>

<div class="flex items-center card card-hover h-64 py-8 px-4" use:popup={popupSettings}>
	<Avatar src={img} width="w-32" height="h-32" rounded="rounded-full" />
	<div class="flex flex-col">
		<h4 class="card-header">{name}</h4>
		<h5 class="card-footer">{title}</h5>
	</div>
	<div class="card variant-filled-surface p-4" data-popup="leaderDetails">
		🚧 Leader details WIP 🚧
		<div class="arrow variant-filled-surface" />
	</div>
</div>
