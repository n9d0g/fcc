<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	const { title, breadcrumb, headData } = data
</script>

<FccLayout {title} {breadcrumb} {headData} />
