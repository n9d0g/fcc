<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
	let excelSheet = $derived(data.excelSheet)
	let attendance = $derived(data.attendance)
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<section>
		<div class="flex max-w-lg flex-col sm:flex-row sm:gap-4">
			<a href={excelSheet} target="_blank" class="btn preset-filled my-4"
				>Details Spreadsheet</a
			>
			<a href={attendance} target="_blank" class="btn preset-filled my-4"
				>Attendance Update</a
			>
		</div>
	</section>
</FccLayout>
