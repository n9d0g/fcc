<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	export let data
	const { title, breadcrumb, headData } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<div class="table-container">
		<table class="table table-interactive table-compact">
			<thead>
				<tr>
					<th>date</th>
					<th>teacher</th>
					<th>lesson title</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>2</td>
					<td>3</td>
				</tr>
			</tbody>
		</table>
	</div>
</FccLayout>
