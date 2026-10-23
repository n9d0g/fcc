<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let excelSheet = $derived(data.excelSheet)
	let attendance = $derived(data.attendance)
</script>

<FccLayout heading="Programming Details.">
	<section>
		<div class="flex flex-col gap-3 sm:flex-row">
			<a href={excelSheet} target="_blank" class="btn btn-primary btn-lg"
				>Details Spreadsheet</a
			>
			<a href={attendance} target="_blank" class="btn btn-outline btn-lg"
				>Attendance Update</a
			>
		</div>
	</section>
</FccLayout>
