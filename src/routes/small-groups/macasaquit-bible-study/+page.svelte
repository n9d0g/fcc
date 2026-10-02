<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<div class="card p-8 text-center">
		<h2 class="h2 mb-4 text-2xl font-bold">Coming Soon</h2>
		<p class="text-surface-600 dark:text-surface-300">
			Details for this small group are being prepared. Check back soon or contact
			the church office for more information.
		</p>
	</div>
</FccLayout>
