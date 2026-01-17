<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<div class="container mx-auto">
		<div>
			<a href="/events/2024/fall-retreat" class="anchor">2024 Fall Retreat</a>
		</div>
	</div>
</FccLayout>
