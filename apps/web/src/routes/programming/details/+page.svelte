<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	// server fetching
	export let data

	const title = data.title
	const breadcrumb = data.breadcrumb
	const headData = data.headData
	const excel = data.excelSheet
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<section>
		<a href={excel} target="_blank" class="btn variant-filled my-4">
			Details Spreadsheet
		</a>
	</section>
</FccLayout>
