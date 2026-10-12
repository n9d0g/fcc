<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<a
		href="/events/2024/fall-retreat"
		class="card card-hover flex max-w-md items-center gap-4 p-5"
	>
		<span class="icon-chip">🍂</span>
		<span>
			<span class="block font-semibold">2024 Fall Retreat</span>
			<span class="block text-sm text-muted">Sessions &amp; worksheets</span>
		</span>
	</a>
</FccLayout>
