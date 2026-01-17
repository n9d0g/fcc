<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	const { title, breadcrumb, headData, excelSheet, attendance } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<section>
		<div class="flex max-w-lg flex-col sm:flex-row sm:gap-4">
			<a href={excelSheet} target="_blank" class="btn preset-filled my-4">Details Spreadsheet</a>
			<a href={attendance} target="_blank" class="btn preset-filled my-4">Attendance Update</a>
		</div>
	</section>
</FccLayout>
