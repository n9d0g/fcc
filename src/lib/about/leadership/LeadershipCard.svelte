<script>
	// imports
	import { Avatar } from '@skeletonlabs/skeleton'

	// props
	export let name
	export let title
	export let img
</script>

<div class="flex items-center card card-hover h-64 p-8">
	<Avatar src={img} width="w-32 h-32" />
	<div class="flex flex-col">
		<h4 class="card-header">{name}</h4>
		<h5 class="card-footer">{title}</h5>
	</div>
</div>
